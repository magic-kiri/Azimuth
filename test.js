const meta = [
    {
      status: { version: "1.0", msg: "Success", code: 0 },
      cost_time: 2.1010000705719,
      metadata: {
        music: [
          {
            release_date: "2013-12-01",
            artists: [{ name: "Led Zeppelin", role: "MainArtist" }],
            play_offset_ms: 22760,
            acrid: "86fcb1393f70d86ce0fb40a079e375c3",
            external_ids: {},
            title: "Stairway to Heaven (2007 Remaster)",
            external_metadata: {},
            album: { name: "Mothership" },
            score: 100,
            duration_ms: 485000,
            result_from: 3,
            genres: [{ name: "Rock" }],
            db_begin_time_offset_ms: 11340,
            db_end_time_offset_ms: 22140,
            sample_begin_time_offset_ms: 0,
            sample_end_time_offset_ms: 10800,
            label: "WMG - Rhino Atlantic",
          },
          {
            label: "Atlantic Records",
            release_date: "1969-01-12",
            artists: [{ name: "Led Zeppelin" }],
            title: "Stairway To Heaven",
            acrid: "f1b5dac5fbae743753835e1ed7fdf510",
            external_ids: {},
            external_metadata: {},
            result_from: 3,
            exids: "musicbrainz",
            album: { name: "Led Zeppelin IV" },
            score: 100,
            duration_ms: 483666,
            genres: [{ name: "Rock" }],
            db_begin_time_offset_ms: 11400,
            db_end_time_offset_ms: 22140,
            sample_begin_time_offset_ms: 0,
            sample_end_time_offset_ms: 10740,
            play_offset_ms: 22820,
          },
          {
            release_date: "2018-10-05",
            artists: [{ name: "Led Zeppelin", role: "MainArtist" }],
            play_offset_ms: 22760,
            acrid: "1d5e9d0d84b6157641039d2e794cbb91",
            external_ids: {},
            title: "Stairway to Heaven (1990 Remaster)",
            external_metadata: {},
            album: { name: "Stairway to Heaven (1990 Remaster)" },
            score: 100,
            duration_ms: 483000,
            result_from: 3,
            genres: [{ name: "Rock" }],
            db_begin_time_offset_ms: 10880,
            db_end_time_offset_ms: 21120,
            sample_begin_time_offset_ms: 0,
            sample_end_time_offset_ms: 10240,
            label: "WMG - Atlantic Records",
          },
        ],
        timestamp_utc: "2023-04-26 14:06:20",
      },
      result_type: 0,
    },
  
    {
      status: { version: "1.0", msg: "Success", code: 0 },
      cost_time: 1.8070001602173,
      metadata: {
        music: [
          {
            release_date: "2016-11-15",
            artists: [
              {
                roles: ["AssociatedPerformer", "MainArtist", "Composer"],
                name: "Amit Trivedi",
              },
              {
                roles: ["AssociatedPerformer", "MainArtist"],
                name: "Sunidhi Chauhan",
              },
            ],
            acrid: "25450084a0bc3632b3f219e9cff1d803",
            external_ids: {},
            external_metadata: {},
            result_from: 1,
            label: "SME - Sony Music Entertainment India Pvt. Ltd.",
            album: { name: 'Just Go to Hell Dil (From "Dear Zindagi")' },
            score: 100,
            duration_ms: 335000,
            genres: [{ name: "Soundtrack (Bollywood)" }],
            title: 'Just Go to Hell Dil (From "Dear Zindagi")',
            db_begin_time_offset_ms: 107620,
            db_end_time_offset_ms: 117060,
            sample_begin_time_offset_ms: 0,
            sample_end_time_offset_ms: 9740,
            play_offset_ms: 117060,
          },
        ],
        timestamp_utc: "2023-04-26 14:19:59",
      },
      result_type: 0,
    },
    { status: { msg: "No result", code: 1001, version: "1.0" } },
  ];
  
  // curl -L -X POST 'https://gtjpquxczkowyjucrmdu.functions.supabase.co/hello/?market="Miami"&country="US"&station="WAMR"&freq=107.5' -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd0anBxdXhjemtvd3lqdWNybWR1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzY5ODMwMTcsImV4cCI6MTk5MjU1OTAxN30.CzTrEw6bNJ4rhtUNj9frD7LNEAAD6B7gIWQENdaERxg' --data '{"status":{"version":"1.0","msg":"Success","code":0},"cost_time":1.8070001602173,"metadata":{"music":[{"release_date":"2016-11-15","artists":[{"roles":["AssociatedPerformer","MainArtist","Composer"],"name":"Amit Trivedi"},{"roles":["AssociatedPerformer","MainArtist"],"name":"Sunidhi Chauhan"}],"acrid":"25450084a0bc3632b3f219e9cff1d803","external_ids":{},"external_metadata":{},"result_from":1,"label":"SME - Sony Music Entertainment India Pvt. Ltd.","album":{"name":"Just Go to Hell Dil (From \"Dear Zindagi\")"},"score":100,"duration_ms":335000,"genres":[{"name":"Soundtrack (Bollywood)"}],"title":"Just Go to Hell Dil (From \"Dear Zindagi\")","db_begin_time_offset_ms":107620,"db_end_time_offset_ms":117060,"sample_begin_time_offset_ms":0,"sample_end_time_offset_ms":9740,"play_offset_ms":117060}],"timestamp_utc":"2023-04-26 14:19:59"},"result_type":0}'