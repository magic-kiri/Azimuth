export const fetchRecords = async ({
  supabase,
  market,
  station,
  country,
  frequency,
  tableName,
}: any) => {
  const prevEntries = await supabase
    .from(tableName)
    .select()
    .eq("country", country)
    .eq("market", market)
    .eq("station", station)
    .eq("frequency", `\"${frequency}\"`)
    .limit(5);
  return prevEntries;
};

export const insertRecords = async (
  { supabase, market, station, country, freq, music, timestamp }: any,
  tableName: string
) => {
  const rows = music.map(({ title, artists, acrid }: any) => {
    return {
      market,
      station,
      country,
      timestamp,
      frequency: `\"${freq}\"`,
      // acrid,
      title,
      artist: artists.map((artist: any) => artist.name).toString(),
    };
  });

  return await supabase.from(tableName).insert(rows).select();
};

export const deleteRecords = async (supabase: any, tableName: string) => {
  const { data, error } = await supabase
    .from(tableName)
    .delete()
    .neq("id", -1)
    .select();
  console.log({ data, error });
  return data;
};
