import { createClient } from "@supabase/supabase-js";

const supabase_url = import.meta.env.VITE_SUPABASE_URL;
const anon_key = import.meta.env.VITE_SUPABASE_KEY;
export const supabase = createClient(supabase_url, anon_key);
