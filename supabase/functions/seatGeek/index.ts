import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://cdn.skypack.dev/@supabase/supabase-js?dts";
import {
  fetchSeatGeekData,
  insertRecordsToSupabase,
  removeDuplicateRows,
} from "./utils.ts";

const url =
  "https://seatgeek.com/api/events?page=1&sort=datetime_local.asc&taxonomies.id=2000000&client_id=MTY2MnwxMzgzMzIwMTU4";

serve(async (req) => {
  console.log("Req recieved");
  const startTime = new Date().getTime();

  const supabase = createClient(
    Deno.env.get("PROJECT_URL")!,
    Deno.env.get("ANON_KEY")!
  );
  // const { from, to } = await req.json();
  // removeDuplicateRows("seatgeek_data", supabase);
  const jsonData = await fetchSeatGeekData(url, 1, 10);
  console.log("Data Fetched :", jsonData.length);

  const uniquelyPushed = await insertRecordsToSupabase(jsonData, supabase);
  console.log("Time : ", (new Date().getTime() - startTime) / 1000);

  return new Response(
    JSON.stringify({
      message: "done",
      uniquelyPushed,
      execution_time: (new Date().getTime() - startTime) / 1000,
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
