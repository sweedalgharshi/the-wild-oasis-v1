import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://grqtxevyqycnnhjcozpe.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdycXR4ZXZ5cXljbm5oamNvenBlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjIzMjQxNzMsImV4cCI6MjAzNzkwMDE3M30.u0DU0a_wTg5bOyD9xxfAg42Yd_TvgneYfHMyeOMKr6U";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
