import type { Song } from "../../domain";

export interface ILibraryRepository {
  getAllSongs(): Song[];
}
