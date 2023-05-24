export const fetchArtist = async ({
  supabase,
  market,
  country,
  artists,
}: any) => {
  const { data, error } = await supabase
    .from("market_spins")
    .select()
    .eq("market", market)
    .eq("country", country);
  const artistMap: Record<any, any> = {};
  data.forEach((record: any) => {
    const matched = artists.find((artist: string) => artist === record.artist);
    if (matched) {
      artistMap[record.artist] = record;
    }
  });
  // console.log({ data, artistMap });
  return artistMap;
};

export const updateArtists = (supabase: any, artistMap: Record<any, any>) => {
  Object.keys(artistMap).forEach((artist) => {
    const artistInfo = artistMap[artist];
    if (artistInfo.spinCount === 1) {
      supabase.from("market_spins").insert(artistInfo).select();
      // .then(({ data }: any) => console.log(artistInfo, { data }));
    } else {
      supabase
        .from("market_spins")
        .update(artistInfo)
        .eq("market", artistInfo.market)
        .eq("country", artistInfo.country)
        .eq("artist", artistInfo.artist)
        .select();
      // .then(({ data }: any) => console.log(artistInfo.artist, { data }));
    }
  });
};
