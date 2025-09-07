import type { Song } from "../../domain/entities";

export interface LoadSongToDeckRequest {
  songId: Song["id"];
  deckNumber: 1 | 2;
}
