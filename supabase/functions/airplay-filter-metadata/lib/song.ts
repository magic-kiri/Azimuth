import { SongCountType } from "../types.ts";

export const filterSong = (song: string) => {
  const regex = /\([^\(\)]*\)/g;
  let s = song;
  // console.log({ s });
  while (s.search(regex) !== -1) {
    s = s.replace(regex, "");
  }
  return s.replace(/\s/g, "");
};

export const isSameSong = (song1: string, song2: string) => {
  return filterSong(song1) === filterSong(song2);
};

export const insertSong = (currentList: SongCountType[], newSong: string) => {
  // console.log(currentList);

  const idx = currentList.findIndex((song) => isSameSong(song.title, newSong));

  if (idx === -1) {
    currentList.push({ title: newSong, count: 1 });
    return;
  }
  currentList[idx].count = currentList[idx].count + 1;

  let temp,
    i = idx;

  while (0 < i && currentList[i - 1].count < currentList[i].count) {
    temp = currentList[i - 1];
    currentList[i - 1] = currentList[i];
    currentList[i] = temp;
    i = i - 1;
  }
};
