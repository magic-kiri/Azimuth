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
  // let cnt = 1;
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
    // if (cnt % 100 === 0) console.log("Data fetched: ", cnt);
    // cnt = cnt + 1;
    records.push(...df);
  }
  const uniqueRecords = dropDuplicate(records);
  return uniqueRecords;
}

export async function insertRecordsToSupabase(
  jsonData: any[],
  supabaseClient: any
) {
  try {
    const { data } = await supabaseClient.from("seatgeek_data").select();
    const uniqueIds = new Set<number>();
    data.forEach((row: any) => {
      uniqueIds.add(row.id);
    });

    const records = jsonData.filter((row: any) => {
      return !uniqueIds.has(row.id);
    });

    await supabaseClient.from("seatgeek_data").insert(records);
    console.log("Inseted Data", records.length);
    return records.length;
  } catch (e) {
    console.log("Error occurred while inserting the record:");
    console.log("Error message:", e.message);
  }
}

export async function removeDuplicateRows(
  tableName: string,
  supabaseClient: any
) {
  const { data } = await supabaseClient.from(tableName).select();

  const uniqueIds = new Set<number>();
  const firstOccurrences: any[] = [];

  for (const row of data) {
    const rowId = row.id;
    if (!uniqueIds.has(rowId)) {
      uniqueIds.add(rowId);
      firstOccurrences.push(row);
    }
  }

  await supabaseClient.from(tableName).delete().neq("id", -1);
  await supabaseClient.from(tableName).insert(firstOccurrences);

  console.log(data.length, uniqueIds.size, data.length - uniqueIds.size);
}
