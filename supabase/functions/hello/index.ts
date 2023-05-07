// import * as postgres from "postgres";
import { serve } from "std/server";

// import { createClient } from "@supabase/supabase-js";
import { createClient } from "supabase";
import { Music, ReqBodyType } from "./types.ts";
import { fetchRecords } from "./dbCall.ts";
import { parseParams, isDupe } from "./utils.ts";

// Create a single supabase client for interacting with your database

serve(async (_req) => {
  try {
    const supabase = createClient(
      // Deno.env.get("PROJECT_URL")!,
      // Deno.env.get("ANON_KEY")!
      "https://gtjpquxczkowyjucrmdu.supabase.co",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd0anBxdXhjemtvd3lqdWNybWR1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzY5ODMwMTcsImV4cCI6MTk5MjU1OTAxN30.CzTrEw6bNJ4rhtUNj9frD7LNEAAD6B7gIWQENdaERxg"
    );
    const method = _req.method;
    const snippet: ReqBodyType = await _req.json();

    const data = await isDupe(supabase, _req.url, snippet.metadata?.music);

    const body = JSON.stringify(data, (_, v) =>
      typeof v === "bigint" ? v.toString() : v
    );

    // Return the response with the correct content type header
    return new Response(body, {
      status: 200,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    });
  } catch (err) {
    console.error(err);
    return new Response(String("My error:" + err?.message ?? err), {
      status: 500,
    });
  }
});
