import type { Deck, Song } from "../../domain/entities";

// Load Song
export interface LoadSongToDeckRequest {
  songId: Song["id"];
  deckNumber: 1 | 2;
}

// Get Deck
export interface GetDeckRequest {
  deckNumber: 1 | 2;
}

export interface GetDeckResponse {
  deck: Deck;
}

// Subscribe
export interface UpsertSubscriptionRequest {
  onSongChange?: (song: Song) => void;
  onPlaybackStatusChange?: (status: "play" | "pause") => void;
}

// Play
export interface PlayRequest {
  deckNumber: 1 | 2;
}
