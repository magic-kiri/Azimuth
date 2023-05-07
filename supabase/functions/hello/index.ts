// import * as postgres from "postgres";
import { serve } from "std/server";

// import { createClient } from "@supabase/supabase-js";
import { createClient } from "supabase";
import { Music, ReqBodyType } from "./types.ts";
import { fetchRecords } from "./dbCall.ts";
import { parseParams } from "./utils.ts";

// Create a single supabase client for interacting with your database

const supabase = createClient(
  Deno.env.get("PROJECT_URL")!,
  Deno.env.get("ANON_KEY")!
);

serve(async (_req) => {
  const method = _req.method;
  const snippet: ReqBodyType = await _req.json();

  // console.log(_req.searchParams.get("country"));
  console.log();

  const fetchParams = {
    supabase,
    tableName: "device_raw_ACR_metadata_queue",
  };

  try {
    const { data, error } = await fetchRecords(fetchParams);

    // Encode the result as pretty printed JSON
    const body = JSON.stringify(
      { data, params: parseParams(_req.url) },
      (_, v) => (typeof v === "bigint" ? v.toString() : v)
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
    return new Response(String(err?.message ?? err), { status: 500 });
  }
});
