import { NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";

const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";

interface ChunkRow {
    content: string;
    page_number: number;
    source_title: string;
    similarity: number;
}

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

        if (!geminiApiKey || !openRouterApiKey) {
            return Response.json({ error: "Missing API keys" }, { status: 500 });
        }

        // ── 1. Generate embedding ────────────────────────────────────────────
        const embeddingRes = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-embedding-2:embedContent?key=${process.env.GEMINI_API_KEY}`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    content: {
                        parts: [{ text: message }],
                    },
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

        // ── 2. Call match_chunks() RPC ───────────────────────────────────────
        const supabase = createClient();

        const rpcParams: Record<string, unknown> = {
            query_embedding: embedding,
            match_count: 8,
            similarity_threshold: 0.65,
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

        // ── 3. Empty chunks → fallback answer ───────────────────────────────
        if (!chunks || (chunks as ChunkRow[]).length === 0) {
            return Response.json({
                answer: "لا تتوفر هذه المعلومات في الكتب المتاحة حالياً",
                sources: [],
            });
        }

        const typedChunks = chunks as ChunkRow[];

        // ── 4. Build prompt ──────────────────────────────────────────────────
        const contextBlock = typedChunks
            .map((c) => `[page ${c.page_number} — ${c.source_title}]: ${c.content}`)
            .join("\n\n");

        const systemPrompt = `You are HELM Assistant, a specialized expert in petroleum engineering.
Answer ONLY based on the provided context below.
If the answer is not found in the context, respond exactly:
"لا تتوفر هذه المعلومات في الكتب المتاحة"
Never invent or assume any information.
Always cite the page number and source title.
Answer in the same language as the question (AR/EN/FR).
Be precise, technical, and concise.

CONTEXT:
${contextBlock}`;

        const userPrompt = `QUESTION: ${message}`;

        // ── 5. Stream from OpenRouter ────────────────────────────────────────
        const llmRes = await fetch(OPENROUTER_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${openRouterApiKey}`,
            },
            body: JSON.stringify({
                model: "nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free",
                stream: true,
                messages: [
                    { role: "system", content: systemPrompt },
                    { role: "user", content: userPrompt },
                ],
            }),
        });

        if (!llmRes.ok || !llmRes.body) {
            const detail = await llmRes.text();
            console.error("OpenRouter error:", detail);
            return Response.json(
                { error: "LLM request failed", details: detail },
                { status: 500 },
            );
        }

        // ── 6. Pipe SSE stream + append sources event ────────────────────────
        const sources = typedChunks.map((c) => ({
            source_title: c.source_title,
            page_number: c.page_number,
            similarity: c.similarity,
        }));

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
                                const content: string | undefined =
                                    parsed.choices?.[0]?.delta?.content;

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

                    // Send sources payload once streaming is complete
                    controller.enqueue(
                        encoder.encode(
                            `data: ${JSON.stringify({ type: "sources", sources })}\n\n`,
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
