-- ============================================================
-- HELM Academy — Migration: vector(768) → vector(3072)
-- gemini-embedding-001 returns 3072-dimensional vectors.
-- Run this in: Supabase Dashboard > SQL Editor
-- ============================================================

-- ── 1. Drop the old IVFFlat index ─────────────────────────────────────────────
DROP INDEX IF EXISTS library_chunks_embedding_idx;

-- ── 2. Change the column type to vector(3072) ─────────────────────────────────
-- NOTE: If the table has existing rows with vector(768) embeddings, 
-- you must delete them first or CAST will fail.
-- Run: DELETE FROM library_chunks; (if you want a clean slate)
ALTER TABLE library_chunks
  ALTER COLUMN embedding TYPE vector(3072);

-- ── 3. Recreate the IVFFlat index for cosine similarity ───────────────────────
CREATE INDEX library_chunks_embedding_idx
  ON library_chunks
  USING ivfflat (embedding vector_cosine_ops)
  WITH (lists = 100);

-- ── 4. Update match_chunks() to accept vector(3072) ──────────────────────────
CREATE OR REPLACE FUNCTION match_chunks(
  query_embedding  vector(3072),
  match_count      int     DEFAULT 8,
  similarity_threshold float DEFAULT 0.65,
  resource_ids     text[]  DEFAULT NULL
)
RETURNS TABLE (
  id            text,
  resource_id   text,
  content       text,
  page_number   int,
  chunk_index   int,
  source_title  text,
  similarity    float
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    lc.id,
    lc.resource_id,
    lc.content,
    lc.page_number,
    lc.chunk_index,
    lc.source_title,
    1 - (lc.embedding <=> query_embedding) AS similarity
  FROM library_chunks lc
  WHERE
    (resource_ids IS NULL OR lc.resource_id = ANY(resource_ids))
    AND 1 - (lc.embedding <=> query_embedding) >= similarity_threshold
  ORDER BY lc.embedding <=> query_embedding
  LIMIT match_count;
END;
$$;
