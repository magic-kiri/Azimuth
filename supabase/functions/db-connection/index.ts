// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { createClient } from "https://cdn.skypack.dev/@supabase/supabase-js?dts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

console.log("Hello from Functions!");

serve(async (req) => {
  const supabase = createClient(
    "https://gtjpquxczkowyjucrmdu.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd0anBxdXhjemtvd3lqdWNybWR1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzY5ODMwMTcsImV4cCI6MTk5MjU1OTAxN30.CzTrEw6bNJ4rhtUNj9frD7LNEAAD6B7gIWQENdaERxg"
  );

  // await supabase
  //   .from("test_cron_kiriti")
  //   .insert({ value: 10, songs: ["A", "B"] });
  const { data } = await supabase.from("test_cron_kiriti").select();

  return new Response(JSON.stringify({ status: "OK", data }), {
    headers: { "Content-Type": "application/json" },
  });
});

// To invoke:
// curl -i --location --request POST 'http://localhost:54321/functions/v1/' \
//   --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
//   --header 'Content-Type: application/json' \
//   --data '{"name":"Functions"}'
