-- ============================================================
-- HELM Academy — Supabase Schema
-- Table: library_resources
-- Run this in the Supabase SQL Editor (Dashboard > SQL Editor)
-- ============================================================


-- ── 1. Custom ENUM types ─────────────────────────────────────

CREATE TYPE resource_type AS ENUM (
    'Book',
    'Research Paper',
    'Summary',
    'Graduation Project'
);

CREATE TYPE resource_category AS ENUM (
    'Drilling',
    'Reservoir',
    'Production',
    'HSE',
    'LNG',
    'Economics',
    'General'
);

CREATE TYPE resource_language AS ENUM (
    'AR',
    'EN',
    'FR'
);


-- ── 2. Table ─────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS library_resources (
    id              text                PRIMARY KEY,
    title           text                NOT NULL,
    author          text                NOT NULL,
    year            integer             NOT NULL,
    type            resource_type       NOT NULL,
    category        resource_category   NOT NULL,
    description     text,
    page_count      integer,
    language        resource_language   NOT NULL,
    is_premium      boolean             NOT NULL DEFAULT false,
    rating          numeric(3, 1),
    reviews_count   integer             NOT NULL DEFAULT 0,
    cover_image     text,
    cover_gradient  text,
    download_count  integer             NOT NULL DEFAULT 0,
    added_at        timestamptz         NOT NULL DEFAULT now(),
    is_featured     boolean             NOT NULL DEFAULT false,
    file_url        text
);


-- ── 3. Row-Level Security ─────────────────────────────────────

ALTER TABLE library_resources ENABLE ROW LEVEL SECURITY;

-- Public: anyone (including unauthenticated) can read all rows
CREATE POLICY "public_select_library"
    ON library_resources
    FOR SELECT
    TO public
    USING (true);

-- Writes: service_role only (bypasses RLS by default, but explicit for clarity)
CREATE POLICY "service_role_insert_library"
    ON library_resources
    FOR INSERT
    TO service_role
    WITH CHECK (true);

CREATE POLICY "service_role_update_library"
    ON library_resources
    FOR UPDATE
    TO service_role
    USING (true)
    WITH CHECK (true);

CREATE POLICY "service_role_delete_library"
    ON library_resources
    FOR DELETE
    TO service_role
    USING (true);


-- ── 4. Indexes ────────────────────────────────────────────────

CREATE INDEX idx_library_type     ON library_resources (type);
CREATE INDEX idx_library_category ON library_resources (category);
CREATE INDEX idx_library_language ON library_resources (language);
CREATE INDEX idx_library_featured ON library_resources (is_featured);
CREATE INDEX idx_library_premium  ON library_resources (is_premium);
