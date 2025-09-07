import type { ILibraryRepository } from "../../app/repository";
import { Song } from "../../domain";

export class LibraryRepository implements ILibraryRepository {
  getAllSongs(): Song[] {
    return [
      new Song({
        name: "Song1",
        audioFile: "/song.mp3",
      }),
      new Song({
        name: "Song2",
        audioFile: "/song.mp3",
      })
    ]
  }
}
