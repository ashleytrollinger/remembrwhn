import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Define a custom storage provider using sessionStorage (only in the browser)
let storage;
if (typeof window !== 'undefined') {
    storage = window.sessionStorage;
}

const supabase = createClient(supabaseUrl, supabaseKey, { auth: {persistSession:true} });

export default supabase;

