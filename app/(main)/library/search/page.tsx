import { getLibraryResources } from "@/lib/supabase/library";
import { LibrarySearchShell } from "../_components/LibrarySearchContent";

export default async function LibrarySearch() {
    const initialResources = await getLibraryResources();

    return <LibrarySearchShell initialResources={initialResources} />;
}
