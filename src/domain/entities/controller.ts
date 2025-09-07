import { Deck } from "./deck";

export class Controller {
  public deckOne: Deck;
  public deckTwo: Deck;

  constructor(audioContext: AudioContext) {
    this.deckOne = new Deck(audioContext, audioContext.destination);
    this.deckTwo = new Deck(audioContext, audioContext.destination);
  }
}
