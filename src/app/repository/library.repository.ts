import type { Song } from "../../domain";

export interface ILibraryRepository {
  getAllSongs(): Song[];
  getSongById(id: Song["id"]): Song | undefined;
}
