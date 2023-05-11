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
  tableName: string,
  firstElementOnly: boolean = false
) => {
  const rows = music.map(({ title, artists, acrid }: any) => {
    return {
      market,
      station,
      country,
      timestamp,
      frequency: `\"${freq}\"`,
      acr_id: acrid,
      title,
      artist: artists.toString(),
    };
  });

  // console.log();
  // console.log(rows);

  return await supabase
    .from(tableName)
    .insert(firstElementOnly ? rows[0] : rows)
    .select();
};

export const deleteRecords = async (
  supabase: any,
  { tableName, market, station, freq, country }: any
) => {
  const { data, error } = await supabase
    .from(tableName)
    .delete()
    .eq("market", market)
    .eq("station", station)
    .eq("country", country)
    .eq("frequency", `\"${freq}\"`)
    .select();
  // console.log(data);

  return data;
};
