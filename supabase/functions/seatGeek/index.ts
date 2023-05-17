import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://cdn.skypack.dev/@supabase/supabase-js?dts";
import {
  fetchSeatGeekData,
  removeDuplicateRows,
  insertRecordsToSupabase,
} from "./utils.ts";

serve(async (req) => {
  console.log("Req recieved!");

  const supabase = createClient(
    "https://gtjpquxczkowyjucrmdu.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd0anBxdXhjemtvd3lqdWNybWR1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzY5ODMwMTcsImV4cCI6MTk5MjU1OTAxN30.CzTrEw6bNJ4rhtUNj9frD7LNEAAD6B7gIWQENdaERxg"
  );

  const url =
    "https://seatgeek.com/api/events?page=1&sort=datetime_local.asc&taxonomies.id=2000000&client_id=MTY2MnwxMzgzMzIwMTU4";
  const jsonData = await fetchSeatGeekData(url, 1, 10);
  console.log("Data Fetched!");
  await insertRecordsToSupabase(jsonData, supabase);
  console.log("Data inserted!");
  await removeDuplicateRows("seatgeek_data", supabase);
  console.log("Dupes removed!");

  return new Response(JSON.stringify({ message: "done" }), {
    headers: { "Content-Type": "application/json" },
  });
});

// To invoke:
// curl -i --location --request POST 'http://localhost:54321/functions/v1/' \
//   --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
//   --header 'Content-Type: application/json' \
//   --data '{"name":"Functions"}'
