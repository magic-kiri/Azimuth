import { Music, ReqBodyType } from "./types.ts";
import { fetchRecords } from "./dbCall.ts";

export const parseParams = (url: string) => {
  const u = new URL(url);
  const po: any = {};

  for (const p of u.searchParams) {
    po[p[0]] = p[1];
  }
  return po;
};

export const isDupe = async (
  supabase: any,
  url: string,
  requestedSongs: Music[] = []
) => {
  const { country, station, freq, market } = parseParams(url);

  const fetchParams = {
    supabase,
    tableName: "device_raw_ACR_metadata_queue",
    // tableName: "device_raw_airplay",
    country,
    station,
    frequency: freq,
    market,
  };

  const { data, error } = await fetchRecords(fetchParams);
  const matched = requestedSongs.find(({ title, acrid, artists }) => {
    const artistNames = artists.map((artist) => artist.name);

    const found = data.find((prevMusic: any) => {
      if (acrid == prevMusic.acrid || title == prevMusic.title) {
        return true;
      }
      // match for artist name
      // start here

      //
    });
    return typeof found !== "undefined";
  });
  return typeof matched !== "undefined";
};
