import columns from "./columns.ts";

const flattenJSON = (obj: any = {}, res: any = {}, extraKey: string = "") => {
  for (let key in obj) {
    if (
      Array.isArray(obj[key]) ||
      obj[key] === null ||
      typeof obj[key] !== "object"
    ) {
      if (columns[`${extraKey}${key}`])
        res[(extraKey + key).replace("_config.", ".")] = obj[key] || NaN;
    } else {
      flattenJSON(obj[key], res, `${extraKey}${key}.`);
    }
  }
  return res;
};

function generateUrls(
  url: string,
  startPage: number,
  endPage: number
): string[] {
  const urls: string[] = [];
  for (let page = startPage; page <= endPage; page++) {
    const newUrl = url.replace("page=1", `page=${page}`);
    urls.push(newUrl);
  }
  return urls;
}

function dropDuplicate(records: any[]) {
  const idExists: any = {};
  return records.filter((record) => {
    const id = record.id;
    if (idExists[id]) {
      return false;
    }
    idExists[id] = true;
    return true;
  });
}

export async function fetchSeatGeekData(
  url: string,
  startPage: number,
  endPage: number
) {
  const generatedUrls = generateUrls(url, startPage, endPage);
  const records: any[] = [];

  for (const url of generatedUrls) {
    const response = await fetch(url);
    const data = await response.json();
    const events = data.events;

    const df = events.map((event: any) => {
      const { performers, ...rest } = event;
      const performer = {
        performer_name: performers[0]?.name,
        performer_type: performers[0]?.type,
        image_url: performers[0]?.image,
      };
      return { ...flattenJSON(rest), ...performer };
    });

    records.push(...df);
  }
  const uniqueRecords = dropDuplicate(records);
  return uniqueRecords;
}

export async function insertRecordsToSupabase(
  jsonData: any[],
  supabaseClient: any
) {
  for (const record of jsonData) {
    try {
      await supabaseClient.from("seatgeek_data").insert(record);
    } catch (e) {
      console.log("Error occurred while inserting the record:");
      console.log(record);
      console.log("Error message:", e.message);
      console.log();
    }
  }
}

export async function removeDuplicateRows(
  tableName: string,
  supabaseClient: any
) {
  const { data } = await supabaseClient.from(tableName).select("*");
  const uniqueIds = new Set<number>();
  const rowsToDelete: number[] = [];

  for (const row of data) {
    const rowId = row.id;
    if (!uniqueIds.has(rowId)) {
      uniqueIds.add(rowId);
    } else {
      rowsToDelete.push(rowId);
    }
  }

  for (const rowId of rowsToDelete) {
    const firstOccurrence = data.find((row: any) => row.id === rowId);
    await supabaseClient.from(tableName).delete().match({ id: rowId });
    await supabaseClient.from(tableName).insert(firstOccurrence);
  }
}
