import { createClient } from "@/lib/supabase/server";
import type {
    LibraryResource,
    ResourceType,
    ResourceCategory,
    ResourceLanguage,
} from "@/data/library";

// ── Raw DB row shape (snake_case) ─────────────────────────────
interface DbRow {
    id: string;
    title: string;
    author: string;
    year: number;
    type: string;
    category: string;
    description: string | null;
    page_count: number | null;
    language: string;
    is_premium: boolean;
    rating: number | null;
    reviews_count: number;
    cover_image: string | null;
    cover_gradient: string | null;
    download_count: number;
    added_at: string;
    is_featured: boolean;
    file_url: string | null;
}

// ── Map DB row → LibraryResource (camelCase) ──────────────────
function mapRow(row: DbRow): LibraryResource {
    return {
        id: row.id,
        title: row.title,
        author: row.author,
        year: row.year,
        type: row.type as ResourceType,
        category: row.category as ResourceCategory,
        description: row.description ?? "",
        pageCount: row.page_count ?? 0,
        language: row.language as ResourceLanguage,
        isPremium: row.is_premium,
        rating: row.rating ?? 0,
        reviewsCount: row.reviews_count,
        coverImage: row.cover_image ?? undefined,
        coverGradient: row.cover_gradient ?? undefined,
        downloadCount: row.download_count,
        addedAt: row.added_at,
        isFeatured: row.is_featured,
        fileUrl: row.file_url ?? undefined,
    };
}

// ── Get all resources with optional filters ───────────────────
export async function getLibraryResources(filters?: {
    type?: string;
    category?: string;
    language?: string;
    isPremium?: boolean;
    search?: string;
}): Promise<LibraryResource[]> {
    const supabase = createClient();
    let query = supabase.from("library_resources").select("*");

    if (filters?.type) query = query.eq("type", filters.type);
    if (filters?.category) query = query.eq("category", filters.category);
    if (filters?.language) query = query.eq("language", filters.language);
    if (filters?.isPremium !== undefined) {
        query = query.eq("is_premium", filters.isPremium);
    }
    if (filters?.search) {
        query = query.or(
            `title.ilike.%${filters.search}%,author.ilike.%${filters.search}%`
        );
    }

    const { data, error } = await query.not("file_url", "is", null).order("added_at", { ascending: false });

    if (error) {
        console.error("[library] getLibraryResources:", error.message);
        return [];
    }

    return ((data ?? []) as DbRow[]).map(mapRow);
}

// ── Get featured resources only ───────────────────────────────
export async function getFeaturedResources(): Promise<LibraryResource[]> {
    const supabase = createClient();
    const { data, error } = await supabase
        .from("library_resources")
        .select("*")
        .eq("is_featured", true)
        .limit(4);

    if (error) {
        console.error("[library] getFeaturedResources:", error.message);
        return [];
    }

    return ((data ?? []) as DbRow[]).map(mapRow);
}

// ── Get single resource by id ─────────────────────────────────
export async function getResourceById(
    id: string
): Promise<LibraryResource | null> {
    const supabase = createClient();
    const { data, error } = await supabase
        .from("library_resources")
        .select("*")
        .eq("id", id)
        .single();

    if (error) {
        console.error("[library] getResourceById:", error.message);
        return null;
    }

    return data ? mapRow(data as DbRow) : null;
}

// ── Search resources by title or author ───────────────────────
export async function searchResources(
    query: string
): Promise<LibraryResource[]> {
    const supabase = createClient();
    const { data, error } = await supabase
        .from("library_resources")
        .select("*")
        .or(`title.ilike.%${query}%,author.ilike.%${query}%`)
        .order("rating", { ascending: false });

    if (error) {
        console.error("[library] searchResources:", error.message);
        return [];
    }

    return ((data ?? []) as DbRow[]).map(mapRow);
}
