// import { createClient } from "@supabase/supabase-js";
// const supabaseUrl = "https://hbebmtiagssdrckajspr.supabase.co";
// const supabaseKey = process.env.SUPABASE_KEY;
// const supabase = createClient(supabaseUrl, supabaseKey);
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://hbebmtiagssdrckajspr.supabase.co";
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
console.log("Printing key");
console.log(supabaseKey);
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
