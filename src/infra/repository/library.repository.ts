import type { ILibraryRepository } from "../../app/repository";
import { Song } from "../../domain/entities";

const SONGS: Song[]= [
  new Song({
    audioFile: "/song.mp3",
    id: "1",
    name: "Song1",
  }),
  new Song({
    audioFile: "/song.mp3",
    id: "2",
    name: "Song2",
  })
];

export class LibraryRepository implements ILibraryRepository {
  getAllSongs(): Song[] {
    return [...SONGS]
  }

  getSongById(id: Song["id"]): Song | undefined {
    return SONGS.find(s => s.id === id);
  }
}
