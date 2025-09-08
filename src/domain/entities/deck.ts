import type { Song } from "./song";
import { SongLoader } from "./song-loader";

export class Deck {
  private _audioContext: AudioContext;
  private _destination: AudioNode;
  private _songLoader: SongLoader;

  constructor(audioContext: AudioContext, destination: AudioNode) {
    this._audioContext = audioContext;
    this._destination = destination;

    this._songLoader = new SongLoader(audioContext, this._destination);

    this._audioContext;
  }

  public async setSong(song: Song) {
    return this._songLoader.setSong(song);
  }

  public get isUsable() {
    return this._songLoader.hasLoaded;
  }

  public play() {
    this._songLoader.play();
  }

  public pause() {
    this._songLoader.pause();
  }

  public jumpTo(time: number) {
    this._songLoader.jumpTo(time);
  }

  public nudge(percentage: number) {
    this._songLoader.nudge(percentage);
  }

  get currentSong() {
    return this._songLoader.current;
  }
}
