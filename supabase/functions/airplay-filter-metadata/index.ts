// import * as postgres from "postgres";
import { serve } from "std/server";

// import { createClient } from "@supabase/supabase-js";
import { createClient } from "supabase";
import { Music, ReqBodyType } from "./types.ts";
import { fetchRecords, insertRecords, deleteRecords } from "./dbCall.ts";
import {
  parseParams,
  isDupe,
  parseArtistNames,
  updateRankList,
} from "./utils.ts";

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
    const params = parseParams(_req.url);
    const music = snippet.metadata?.music;
    
    const dupe = await isDupe(supabase, params, music);

    const insertionParams = {
      ...params,
      supabase,
      music: music
        ? music.map((m) => {
            return {
              acrid: m.acrid,
              title: m.title,
              artists: parseArtistNames(m.artists),
            };
          })
        : [],
    };
    // console.log({ dupe });
    if (!dupe) {
      const data = await insertRecords(
        insertionParams,
        "device_raw_airplay_kiriti",
        true
      );

      updateRankList(
        supabase,
        params.market,
        params.country,
        params.timestamp,
        insertionParams.music[0].artists,
        insertionParams.music[0].title
      );

      await deleteRecords(supabase, {
        tableName: "device_raw_ACR_metadata_queue",
        ...params,
      });
    }

    const data = await insertRecords(
      insertionParams,
      "device_raw_ACR_metadata_queue"
    );

    const result = {
      status: dupe
        ? "The song is duplicate. Successfully inserted into the queue"
        : "This is a new song. Inserted into to queue and updated the first entry in the main table ",
    };

    const body = JSON.stringify(result, (_, v) =>
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
