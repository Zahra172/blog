import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://jtwnbfblkuhzsrhnktgc.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp0d25iZmJsa3VoenNyaG5rdGdjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk4NDM2MzQsImV4cCI6MjA2NTQxOTYzNH0.K0gK1bNKud7bvsS7oLzUjzUG9pR2H0m0RsZE5Js38iY";

export const supabase = createClient(supabaseUrl, supabaseKey);
