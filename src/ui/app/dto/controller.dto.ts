import type { Song } from "../../domain";

export interface LoadSongToDeckRequest {
  songId: Song["id"];
  deckNumber: 1 | 2;
}
