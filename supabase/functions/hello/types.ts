export type Music = {
  release_date: Date | string;
  artists: Object[];
  play_offset_ms: number;
  acrid: string;
  external_ids: Object;
  title: Object;
  external_metadata: Object;
  album: Object;
  score: number;
  duration_ms: number;
  result_from: number;
  genres: Object[];
  db_begin_time_offset_ms: number;
  db_end_time_offset_ms: number;
  sample_begin_time_offset_ms: number;
  sample_end_time_offset_ms: number;
  label: string;
};

export type ReqBodyType = {
  status: Object;
  cost_time?: number;
  metadata?: Music[];
  timestamp_utc?: Date | string;
  result_type?: number;
};
