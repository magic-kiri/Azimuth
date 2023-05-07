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
    .select("*")
    .eq("country", country)
    .eq("market", market)
    .eq("station", station)
    .eq("frequency", `\"${frequency}\"`)
    .limit(5);
  return prevEntries;
};
