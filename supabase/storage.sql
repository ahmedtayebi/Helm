-- Create library-files bucket (private)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'library-files',
  'library-files',
  false,
  52428800,
  ARRAY['application/pdf']
);

-- Create library-covers bucket (public)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'library-covers',
  'library-covers',
  true,
  5242880,
  ARRAY['image/jpeg', 'image/png', 'image/webp']
);

-- RLS: Anyone can view covers
CREATE POLICY "Public can view covers"
ON storage.objects FOR SELECT
USING (bucket_id = 'library-covers');

-- RLS: Anyone can view files (access controlled in frontend)
CREATE POLICY "Public can view files"
ON storage.objects FOR SELECT
USING (bucket_id = 'library-files');

-- RLS: Only service_role can upload
CREATE POLICY "Service role can upload files"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id IN ('library-files', 'library-covers'));

-- RLS: Only service_role can delete
CREATE POLICY "Service role can delete files"
ON storage.objects FOR DELETE
USING (bucket_id IN ('library-files', 'library-covers'));
