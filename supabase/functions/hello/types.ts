export type Music = {
  release_date: Date | string;
  artists: any[];
  play_offset_ms: number;
  acrid: string;
  external_ids: any;
  title: any;
  external_metadata: any;
  album: any;
  score: number;
  duration_ms: number;
  result_from: number;
  genres: any[];
  db_begin_time_offset_ms: number;
  db_end_time_offset_ms: number;
  sample_begin_time_offset_ms: number;
  sample_end_time_offset_ms: number;
  label: string;
};

export type ReqBodyType = {
  status: any;
  cost_time?: number;
  metadata?: {
    music: Music[];
    timestamp_utc: Date | string;
  };
  result_type?: number;
};
