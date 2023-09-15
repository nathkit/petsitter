import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
dotenv.config();
const supabase_url = process.env.SUPABASE_URL;
const anon_key = process.env.SUPABASE_KEY;
export const supabase = createClient(supabase_url, anon_key);
