import { Music, ReqBodyType, Artists } from "./types.ts";
import { fetchRecords } from "./dbCall.ts";
import { fetchArtist, updateArtists } from "./database-functions/ranklist.ts";

const TIME_LIMIT = 1000 * 60 * 30;

export const parseParams = (url: string) => {
  const u = new URL(url);
  const po: any = {};

  for (const p of u.searchParams) {
    po[p[0]] = p[1];
  }
  return po;
};

export const parseArtistNames = (artists: Artists) => {
  const names = artists.filter(({ roles, role }) => {
    if (role && role === "MainArtist") {
      return true;
    } else if (roles) {
      const found = roles.find((role) => role === "MainArtist");
      return !!found;
    }
    return false;
  });

  if (names.length === 0) {
    return artists.map((artist) => artist.name);
  }

  return names.map((artist) => artist.name);
};

const matchName = (artistNames: string[], prevArtists: string) => {
  return !!artistNames.find((name) => prevArtists.includes(name));
};

export const isDupe = async (
  supabase: any,
  params: any,
  requestedSongs: Music[] = []
) => {
  const { country, station, freq, market, timestamp } = params;

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
  let timeDifference = 0;

  const matched = requestedSongs.find(({ title, acrid, artists }) => {
    if (timeDifference > TIME_LIMIT) return false;
    const newDate = new Date(timestamp.slice(1, -1)).getTime();

    const artistNames = parseArtistNames(artists);

    const found = data.find((prevMusic: any) => {
      const prevDate = new Date(prevMusic.timestamp).getTime();

      timeDifference = Math.max(timeDifference, newDate - prevDate);
      if (timeDifference > TIME_LIMIT) return false;

      if (acrid == prevMusic.acr_id || title === prevMusic.title) {
        return true;
      }
      // match for artist name
      // start here
      return matchName(artistNames, prevMusic.artist);
      //
    });
    return !!found;
  });
  return !!matched;
};

export const updateRankList = async (
  supabase: any,
  market: string,
  country: string,
  timestamp: string,
  artists: string[]
) => {
  const artistMap = await fetchArtist({ supabase, market, country, artists });
  artists.forEach((artist) => {
    if (artistMap[artist]) {
      artistMap[artist].spinCount = artistMap[artist].spinCount + 1;
    } else {
      artistMap[artist] = {
        market,
        country,
        artist,
        spinCount: 1,
        timestamp: new Date(timestamp.slice(1, -1)),
      };
    }
  });
  updateArtists(supabase, artistMap);
};
