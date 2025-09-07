import type { Song } from "../../domain/entities";

export interface ILibraryRepository {
  getAllSongs(): Song[];
  getSongById(id: Song["id"]): Song | undefined;
}
