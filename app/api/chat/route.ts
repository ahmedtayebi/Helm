import { NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";

// ── Constants ─────────────────────────────────────────────────────────────────
const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";

// OpenRouter fallback cascade (used only if Gemini fails)
const FALLBACK_MODELS = [
    "nousresearch/hermes-3-llama-3.1-405b:free", // 405B — best quality
    "nvidia/nemotron-3-super-120b-a12b:free",      // 120B
    "meta-llama/llama-3.3-70b-instruct:free",      // 70B
    "nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free",
];

interface ChunkRow {
    id: string;
    content: string;
    page_number: number;
    source_title: string;
    resource_id: string;
    similarity: number;
}

// ── Gemini 2.0 Flash (primary LLM) ───────────────────────────────────────────
// async function callGemini(
//     apiKey: string,
//     systemPrompt: string,
//     userPrompt: string,
// ): Promise<Response> {
//     const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:streamGenerateContent?key=${apiKey}&alt=sse`;
//     return fetch(url, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//             system_instruction: { parts: [{ text: systemPrompt }] },
//             contents: [{ role: "user", parts: [{ text: userPrompt }] }],
//             generationConfig: {
//                 temperature: 0.35,
//                 maxOutputTokens: 2048,
//                 topP: 0.9,
//             },
//         }),
//     });
// }

// ── OpenRouter fallback cascade ───────────────────────────────────────────────
async function callOpenRouter(
    apiKey: string,
    systemPrompt: string,
    userPrompt: string,
): Promise<Response> {
    for (const model of FALLBACK_MODELS) {
        const res = await fetch(OPENROUTER_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model,
                stream: true,
                messages: [
                    { role: "system", content: systemPrompt },
                    { role: "user", content: userPrompt },
                ],
            }),
        });
        if (res.status === 429) {
            console.warn(`[cascade] ${model} rate-limited, trying next...`);
            continue;
        }
        return res;
    }
    throw new Error("جميع النماذج غير متاحة حالياً. حاول مرة أخرى بعد لحظات.");
}

// ── System prompts ────────────────────────────────────────────────────────────
function buildSystemPrompt(contextBlock: string, hasContext: boolean): string {
    if (hasContext) {
        return `You are HELM Assistant — a specialized petroleum engineering AI tutor built by HELM Academy.
You have been given text excerpts extracted directly from petroleum engineering textbooks.

## YOUR MISSION
Explain the scientific and technical content to the user clearly and in detail.
Act like a professor teaching from a textbook — NOT a librarian pointing to a shelf.

## STRICT RULES
1. **ALWAYS explain the actual scientific content** found in the excerpts. Never just say "the answer is on page X" or "refer to page X".
2. **Extract and teach**: If the excerpt describes a concept, formula, procedure, or principle — explain it fully in your own words, supported by the excerpt text.
3. **Cite naturally**: After explaining a concept, you may note the source (e.g., "as described in Summary: Well Control, p.12").
4. **Answer in the SAME language as the question** (Arabic, English, or French).
5. **Use structure**: Use bullet points, numbered steps, formulas, and headers to organize technical answers.
6. **Be comprehensive**: If the excerpts cover the topic from multiple angles, cover all of them.
7. **Never refuse**: If the excerpts contain ANY relevant content, teach it. Do not say "I cannot find..." if content is present.
8. **Supplement when needed**: If the excerpts only partially answer the question, teach what you find, then add from your petroleum engineering knowledge — clearly marking the addition as [من معرفتي العامة] or [From general knowledge].

## WHAT IS FORBIDDEN
- ❌ "The answer can be found on page X"
- ❌ "Refer to the passage on page X for details"
- ❌ "The document mentions this topic on page X"
- ❌ Copying raw excerpt text without explanation
- ❌ Refusing to answer when content exists

## EXCERPTS FROM TEXTBOOKS
${contextBlock}`;
    }

    return `You are HELM Assistant — a specialized petroleum engineering AI tutor built by HELM Academy.
No matching excerpts were found in the indexed textbooks for this question.
Answer from your comprehensive petroleum engineering knowledge.
Clearly note that this answer comes from general knowledge, not the indexed books.
Answer in the SAME language as the question (Arabic, English, or French).
If the question is completely outside petroleum engineering, politely say so.`;
}

// ── Main handler ──────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const message: string = (body.message ?? "").trim();
        const resource_ids: string[] | undefined = body.resource_ids;

        if (!message) {
            return Response.json({ error: "message is required" }, { status: 400 });
        }

        const geminiApiKey = process.env.GEMINI_API_KEY;
        const openRouterApiKey = process.env.OPENROUTER_API_KEY;

        if (!geminiApiKey) {
            return Response.json({ error: "Missing GEMINI_API_KEY" }, { status: 500 });
        }

        // ── 1. Generate embedding (Gemini Embedding-2, 768 dims) ─────────────
        const embeddingRes = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-embedding-2:embedContent?key=${geminiApiKey}`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    content: { parts: [{ text: message }] },
                    outputDimensionality: 768,
                }),
            },
        );

        if (!embeddingRes.ok) {
            const detail = await embeddingRes.text();
            console.error("Gemini embedding error:", detail);
            return Response.json(
                { error: "Embedding generation failed", details: detail },
                { status: 500 },
            );
        }

        const embeddingData = await embeddingRes.json();
        const embedding: number[] | undefined = embeddingData.embedding?.values;

        if (!embedding || embedding.length === 0) {
            return Response.json(
                { error: `Invalid embedding dimension: ${embedding?.length ?? 0}` },
                { status: 500 },
            );
        }

        // ── 2. Vector search via match_chunks() RPC ──────────────────────────
        const supabase = createClient();

        const rpcParams: Record<string, unknown> = {
            query_embedding: embedding,
            match_count: 15,        // up from 10 — more coverage
            similarity_threshold: 0.45,
        };

        if (resource_ids && resource_ids.length > 0) {
            rpcParams.resource_ids = resource_ids;
        }

        const { data: chunks, error: rpcError } = await supabase.rpc(
            "match_chunks",
            rpcParams,
        );

        if (rpcError) {
            console.error("match_chunks RPC error:", rpcError);
            return Response.json(
                { error: "Failed to retrieve context", details: rpcError.message },
                { status: 500 },
            );
        }

        // ── 3. Prepare context ───────────────────────────────────────────────
        const typedChunks = (chunks ?? []) as ChunkRow[];
        const hasContext = typedChunks.length > 0;

        // ── 4a. Fetch file_url for unique resource_ids ───────────────────────
        const uniqueResourceIds = Array.from(new Set(typedChunks.map((c) => c.resource_id)));
        const { data: resources } = uniqueResourceIds.length > 0
            ? await supabase.from("library_resources").select("id, file_url").in("id", uniqueResourceIds)
            : { data: [] };

        const fileUrlMap: Record<string, string | null> = Object.fromEntries(
            (resources ?? []).map((r) => [r.id, (r.file_url as string | null) ?? null]),
        );

        // ── 4b. Build prompt context ─────────────────────────────────────────
        const contextBlock = typedChunks
            .map((c) => `[ص${c.page_number} — ${c.source_title} (تطابق: ${(c.similarity * 100).toFixed(0)}%)]: ${c.content}`)
            .join("\n\n---\n\n");

        const systemPrompt = buildSystemPrompt(contextBlock, hasContext);
        const userPrompt = message;

        // ── 5. OpenRouter cascade (Gemini LLM quota=0, skipped) ──────────────
        const usingGemini = false;
        if (!openRouterApiKey) {
            return Response.json({ error: "Missing OPENROUTER_API_KEY" }, { status: 500 });
        }
        let llmRes: Response;
        try {
            llmRes = await callOpenRouter(openRouterApiKey, systemPrompt, userPrompt);
        } catch (err) {
            const msg = err instanceof Error ? err.message : "All models unavailable";
            return Response.json({ error: msg }, { status: 503 });
        }

        if (!llmRes.ok || !llmRes.body) {
            const detail = await llmRes.text();
            console.error("LLM error:", detail);
            return Response.json({ error: "LLM request failed", details: detail }, { status: 500 });
        }

        // ── 6. Group sources by book (only if genuinely relevant) ─────────────
        // Show sources only when best chunk similarity ≥ 0.60
        // — this is robust to typos, greetings, off-topic questions, etc.
        const bestSimilarity = typedChunks.length > 0
            ? Math.max(...typedChunks.map((c) => c.similarity))
            : 0;
        const shouldShowSources = bestSimilarity >= 0.60;

        const sourceMap = new Map<string, {
            source_title: string;
            pages: number[];
            resource_id: string;
            file_url: string | null;
        }>();

        if (shouldShowSources) {
            for (const c of typedChunks) {
                if (!sourceMap.has(c.resource_id)) {
                    sourceMap.set(c.resource_id, {
                        source_title: c.source_title,
                        pages: [],
                        resource_id: c.resource_id,
                        file_url: fileUrlMap[c.resource_id] ?? null,
                    });
                }
                const entry = sourceMap.get(c.resource_id)!;
                if (!entry.pages.includes(c.page_number)) {
                    entry.pages.push(c.page_number);
                }
            }
        }

        const sources = Array.from(sourceMap.values()).map((s) => ({
            ...s,
            pages: s.pages.sort((a, b) => a - b),
        }));

        // ── 7. Pipe SSE stream ───────────────────────────────────────────────
        const encoder = new TextEncoder();
        const upstreamReader = llmRes.body.getReader();

        const stream = new ReadableStream({
            async start(controller) {
                const decoder = new TextDecoder();

                try {
                    while (true) {
                        const { done, value } = await upstreamReader.read();
                        if (done) break;

                        const rawText = decoder.decode(value, { stream: true });

                        for (const line of rawText.split("\n")) {
                            const trimmed = line.trim();
                            if (!trimmed.startsWith("data: ")) continue;

                            const payload = trimmed.slice(6);
                            if (payload === "[DONE]") continue;

                            try {
                                const parsed = JSON.parse(payload);

                                // Works for BOTH Gemini and OpenRouter formats
                                const content: string | undefined =
                                    parsed.candidates?.[0]?.content?.parts?.[0]?.text ||  // Gemini
                                    parsed.choices?.[0]?.delta?.content;                    // OpenRouter

                                if (content) {
                                    controller.enqueue(
                                        encoder.encode(
                                            `data: ${JSON.stringify({ type: "chunk", content })}\n\n`,
                                        ),
                                    );
                                }
                            } catch {
                                // skip malformed SSE frames
                            }
                        }
                    }

                    // Append sources + model info after stream ends
                    controller.enqueue(
                        encoder.encode(
                            `data: ${JSON.stringify({ type: "sources", sources, model: usingGemini ? "gemini-2.0-flash" : "openrouter" })}\n\n`,
                        ),
                    );
                    controller.enqueue(encoder.encode("data: [DONE]\n\n"));
                } catch (err) {
                    controller.error(err);
                } finally {
                    controller.close();
                }
            },
        });

        return new Response(stream, {
            headers: {
                "Content-Type": "text/event-stream",
                "Cache-Control": "no-cache, no-transform",
                Connection: "keep-alive",
                "X-Accel-Buffering": "no",
            },
        });
    } catch (error) {
        console.error("Chat route error:", error);
        return Response.json(
            {
                error: "Internal server error",
                details: error instanceof Error ? error.message : String(error),
            },
            { status: 500 },
        );
    }
}
