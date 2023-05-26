// import * as postgres from "postgres";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js";
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
  const startTime = new Date().getTime();
  try {
    const supabase = createClient(
      Deno.env.get("PROJECT_URL")!,
      Deno.env.get("ANON_KEY")!
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
        "device_raw_airplay",
        true
      );

      updateRankList(
        supabase,
        params.market,
        params.country,
        params.station,
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
  } finally {
    const executionTime = (new Date().getTime() - startTime) / 1000;
    console.log(`Execution Time: ${executionTime}s.`);
  }
});
