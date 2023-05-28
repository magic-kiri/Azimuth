import { Music, ReqBodyType, Artists } from "../types.ts";

// This is a diagnostic function
export const isInvalid = (artists: any) => {
  if (!artists) return true;
  if (!Array.isArray(artists)) return true;
  if (artists.length === 0) return true;
  if (
    artists.findIndex(
      (name) => typeof name !== "string" || name.length === 0
    ) !== -1
  )
    return true;
  return false;
};

export const matchName = (artistNames: string[], prevArtists: string) => {
  return !!artistNames.find((name) => prevArtists.includes(name));
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
