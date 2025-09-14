import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey =
    process.env.SUPABASE_SERVICE_ROLE ?? process.env.SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: { persistSession: false }
});
