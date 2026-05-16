// @ts-nocheck
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.103.0";
import { extractText, getDocumentProxy } from "npm:unpdf";

type IndexPdfRequest = {
  resource_id?: string;
};

type LibraryResource = {
  id: string;
  title: string;
  file_url: string | null;
};

type PageText = {
  page: number;
  text: string;
};

type Chunk = {
  content: string;
  page_number: number;
  chunk_index: number;
  token_count: number;
  content_hash: string;
};

const STORAGE_BUCKET = "library-files";
const MAX_CHARS = 2400;
const OVERLAP_CHARS = 320;
const GEMINI_EMBEDDING_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-embedding-2:embedContent";
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return jsonResponse({ error: "Method not allowed" }, 405);
  }

  try {
    const body = await req.json() as IndexPdfRequest;
    const resourceId = body.resource_id?.trim();

    if (!resourceId) {
      return jsonResponse({ error: "resource_id is required" }, 400);
    }

    const supabaseUrl =
      Deno.env.get("SUPABASE_URL") ?? Deno.env.get("NEXT_PUBLIC_SUPABASE_URL");
    const serviceRoleKey = Deno.env.get("SERVICE_ROLE_KEY");
    const geminiApiKey = Deno.env.get("GEMINI_API_KEY");

    if (!supabaseUrl || !serviceRoleKey || !geminiApiKey) {
      return jsonResponse(
        { error: "Missing SUPABASE_URL/NEXT_PUBLIC_SUPABASE_URL, SERVICE_ROLE_KEY, or GEMINI_API_KEY" },
        500,
      );
    }

    const supabase = createClient(supabaseUrl, serviceRoleKey);

    // ── 1. Fetch resource metadata ────────────────────────────────────────────
    const { data: resource, error: resourceError } = await supabase
      .from("library_resources")
      .select("id,title,file_url")
      .eq("id", resourceId)
      .single<LibraryResource>();

    if (resourceError || !resource) {
      return jsonResponse(
        { error: "Resource not found", details: resourceError?.message },
        404,
      );
    }

    if (!resource.file_url) {
      return jsonResponse({ error: "Resource has no file_url" }, 400);
    }

    // ── 2. Download PDF from Storage ──────────────────────────────────────────
    // Path is resource_id (no .pdf extension), inside library-files bucket
    const { data: pdfFile, error: downloadError } = await supabase.storage
      .from(STORAGE_BUCKET)
      .download(resourceId);

    if (downloadError || !pdfFile) {
      return jsonResponse(
        { error: "Could not download PDF", details: downloadError?.message },
        500,
      );
    }

    // ── 3. Extract text page by page ──────────────────────────────────────────
    const pdfBuffer = new Uint8Array(await pdfFile.arrayBuffer());
    const pages = await extractPdfPages(pdfBuffer);

    // ── 4. Build chunks with overlap ──────────────────────────────────────────
    const chunks = await buildChunks(pages);

    // ── 5. Load existing hashes to skip duplicates ────────────────────────────
    const existingHashes = await getExistingHashes(supabase, resourceId);

    let indexed = 0;
    let skipped = 0;

    // ── 6. Embed and insert each new chunk ────────────────────────────────────
    for (const chunk of chunks) {
      if (existingHashes.has(chunk.content_hash)) {
        skipped += 1;
        continue;
      }

      const embedding = await generateEmbedding(chunk.content, geminiApiKey);

      const { error: insertError } = await supabase.from("library_chunks").insert({
        resource_id: resourceId,
        content: chunk.content,
        page_number: chunk.page_number,
        chunk_index: chunk.chunk_index,
        token_count: chunk.token_count,
        source_title: resource.title,
        content_hash: chunk.content_hash,
        embedding,
      });

      if (insertError) {
        // 23505 = unique_violation — race condition, treat as skipped
        if (insertError.code === "23505") {
          skipped += 1;
          existingHashes.add(chunk.content_hash);
          continue;
        }
        throw insertError;
      }

      indexed += 1;
      existingHashes.add(chunk.content_hash);
    }

    return jsonResponse({
      success: true,
      indexed,
      skipped,
      resource_id: resourceId,
    });
  } catch (error) {
    console.error("Full error:", JSON.stringify(error, null, 2));
    return jsonResponse(
      {
        error: "Failed to index PDF",
        details: error instanceof Error
          ? error.message
          : JSON.stringify(error),
      },
      500,
    );
  }
});

// ── PDF extraction ────────────────────────────────────────────────────────────

async function extractPdfPages(pdfBuffer: Uint8Array): Promise<PageText[]> {
  const pdf = await getDocumentProxy(pdfBuffer);
  const { text } = await extractText(pdf, { mergePages: false });

  return text.map((pageText, index) => ({
    page: index + 1,
    text: normalizeText(pageText),
  }));
}

// ── Chunking ──────────────────────────────────────────────────────────────────

async function buildChunks(pages: PageText[]): Promise<Chunk[]> {
  const chunks: Chunk[] = [];
  let chunkIndex = 0;

  for (const page of pages) {
    const pageChunks = splitPageIntoChunks(page.text);

    for (const content of pageChunks) {
      const normalizedContent = normalizeText(content);
      if (!normalizedContent) continue;

      chunks.push({
        content: normalizedContent,
        page_number: page.page,
        chunk_index: chunkIndex,
        token_count: estimateTokenCount(normalizedContent),
        content_hash: await sha256(normalizedContent),
      });
      chunkIndex += 1;
    }
  }

  return chunks;
}

function splitPageIntoChunks(text: string): string[] {
  const paragraphs = text
    .split(/\n\s*\n/g)
    .map((p) => p.trim())
    .filter(Boolean);

  const chunks: string[] = [];
  let current = "";

  for (const paragraph of paragraphs) {
    if (paragraph.length > MAX_CHARS) {
      if (current) {
        chunks.push(current.trim());
        current = tailForOverlap(current);
      }
      const slices = splitLongParagraph(paragraph);
      chunks.push(...slices);
      current = tailForOverlap(slices.at(-1) ?? "");
      continue;
    }

    const separator = current ? "\n\n" : "";
    const next = `${current}${separator}${paragraph}`;

    if (next.length <= MAX_CHARS) {
      current = next;
      continue;
    }

    if (current) {
      chunks.push(current.trim());
      current = tailForOverlap(current);
    }

    current = current ? `${current}\n\n${paragraph}` : paragraph;
  }

  if (current.trim()) chunks.push(current.trim());

  return chunks;
}

function splitLongParagraph(paragraph: string): string[] {
  const chunks: string[] = [];
  let start = 0;

  while (start < paragraph.length) {
    const end = Math.min(start + MAX_CHARS, paragraph.length);
    chunks.push(paragraph.slice(start, end).trim());
    if (end === paragraph.length) break;
    start = Math.max(end - OVERLAP_CHARS, start + 1);
  }

  return chunks.filter(Boolean);
}

function tailForOverlap(text: string): string {
  return text.slice(Math.max(0, text.length - OVERLAP_CHARS)).trim();
}

function estimateTokenCount(text: string): number {
  return Math.ceil(text.length / 4);
}

function normalizeText(text: string): string {
  return text
    .replace(/\r\n/g, "\n")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

// ── Hashing ───────────────────────────────────────────────────────────────────

async function sha256(content: string): Promise<string> {
  const bytes = new TextEncoder().encode(content);
  const hashBuffer = await crypto.subtle.digest("SHA-256", bytes);
  return [...new Uint8Array(hashBuffer)]
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

// ── Deduplication ─────────────────────────────────────────────────────────────

async function getExistingHashes(
  supabase: ReturnType<typeof createClient>,
  resourceId: string,
): Promise<Set<string>> {
  const { data, error } = await supabase
    .from("library_chunks")
    .select("content_hash")
    .eq("resource_id", resourceId);

  if (error) throw error;

  return new Set(
    (data ?? [])
      .map((row) => row.content_hash)
      .filter((hash): hash is string => typeof hash === "string"),
  );
}

// ── Gemini embedding ──────────────────────────────────────────────────────────
async function generateEmbedding(content: string, apiKey: string): Promise<number[]> {
  const response = await fetch(`${GEMINI_EMBEDDING_URL}?key=${apiKey}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      content: {
        parts: [{ text: content }],
      },
      outputDimensionality: 768,
    }),
  });

  if (!response.ok) {
    throw new Error(`Gemini embedding failed: ${response.status} ${await response.text()}`);
  }

  const data = await response.json() as { embedding?: { values?: number[] } };
  const values = data.embedding?.values;

  if (!values || values.length === 0) {
    throw new Error(`Gemini returned invalid embedding dimension: ${values?.length ?? 0}`);
  }

  return values;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      ...corsHeaders,
      "Content-Type": "application/json",
    },
  });
}
