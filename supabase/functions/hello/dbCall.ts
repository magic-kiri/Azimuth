type Params = {
  supabase: any;
  market?: string;
  station?: string;
  country?: string;
  freq?: string;
  tableName: string;
};

export const fetchRecords = async ({
  supabase,
  market,
  station,
  country,
  freq,
  tableName,
}: Params) => {
  const prevEntries = await supabase
    .from(tableName)
    .select("*")
    .limit(2);
  console.log(prevEntries);
  return prevEntries;
};
