// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { createClient } from "https://cdn.skypack.dev/@supabase/supabase-js?dts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

console.log("Hello from Functions!");
async function doTask(supabaseClient: any) {
  try {
    const { data } = await supabaseClient.from("test_cron_kiriti").select("*");
    // console.log(res);
    if (data) {
      await supabaseClient
        .from("test_cron_kiriti")
        .insert({ value: data.length + 1 });
      return data.length + 1;
    } else return -1;
  } catch (e) {
    console.log("Error occurred while inserting the record:");
    // console.log(record);
    console.log("Error message:", e.message);
    // console.log();
    return -1;
  }
}

serve(async (req) => {
  console.log("Req recieved");
  const startTime = new Date().getTime();

  const supabase = createClient(
    Deno.env.get("PROJECT_URL")!,
    Deno.env.get("ANON_KEY")!
  );
  const res = await doTask(supabase);
  console.log(res);

  return new Response(
    JSON.stringify({
      message: "done",
    }),
    {
      headers: { "Content-Type": "application/json" },
    }
  );
});

// To invoke:
// curl -i --location --request POST 'http://localhost:54321/functions/v1/' \
//   --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
//   --header 'Content-Type: application/json' \
//   --data '{"name":"Functions"}'
