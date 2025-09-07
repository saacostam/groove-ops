import type { Song } from "./song";

export class SongLoader {
  private _audioContext: AudioContext;
  private _buffer: AudioBuffer | null = null;
  private _destination: AudioNode;
  private _source: AudioBufferSourceNode | null = null;

  private _startTime = 0;
  private _pauseTime = 0;
  private _isPlaying = false;
  private _ignoreNextEnd = false;

  private _current: Song | undefined;

  constructor(audioContext: AudioContext, destination: AudioNode) {
    this._audioContext = audioContext;
    this._destination = destination;
  }

  public async setSong(song: Song): Promise<void> {
    this._current = song;
    return this._loadSong(song);
  }

  private async _loadSong(song: Song): Promise<void> {
    const res = await fetch(song.audioFile);
    const arrayBuffer = await res.arrayBuffer();
    this._buffer = await this._audioContext.decodeAudioData(arrayBuffer);
  }

  private _createSource(offset: number = 0): AudioBufferSourceNode {
    if (!this._buffer) {
      throw new Error("Audio buffer not loaded");
    }

    const source = this._audioContext.createBufferSource();
    source.buffer = this._buffer;
    source.connect(this._destination);

    source.onended = () => {
      if (!this._ignoreNextEnd) {
        this._isPlaying = false;
        this._pauseTime = 0;
      }
      this._ignoreNextEnd = false;
    };

    source.start(0, offset);
    return source;
  }

  public play(): void {
    if (!this._buffer) {
      console.error("Audio not loaded yet.");
      return;
    }
    if (!this._isPlaying) {
      this._source = this._createSource(this._pauseTime);
      this._startTime = this._audioContext.currentTime - this._pauseTime;
      this._isPlaying = true;
    }
  }

  public pause(): void {
    if (this._isPlaying && this._source) {
      this._ignoreNextEnd = true;
      this._source.stop();
      this._pauseTime = this._audioContext.currentTime - this._startTime;
      this._isPlaying = false;
    }
  }

  public jumpTo(seconds: number): void {
    if (!this._buffer) {
      console.error("Audio not loaded yet.");
      return;
    }
    if (seconds < 0 || seconds > this._buffer.duration) {
      console.error("Jump position out of range");
      return;
    }

    this._pauseTime = seconds;

    if (this._isPlaying) {
      this._ignoreNextEnd = true;
      this._source?.stop();
      this._source = this._createSource(seconds);
      this._startTime = this._audioContext.currentTime - seconds;
    }
  }

  public nudge(percent: number): void {
    if (!this._source) return;
    if (percent < -5 || percent > 5) {
      console.warn("Nudge percent should be between -5 and 5");
      percent = Math.min(-5, Math.max(percent, 5));
    }

    const ratio = 1 + percent / 100;
    const now = this._audioContext.currentTime;

    // Push the speed
    this._source.playbackRate.setValueAtTime(ratio, now);

    // Smooth back to 1 over 0.5 seconds
    this._source.playbackRate.linearRampToValueAtTime(1, now + 0.2);
  }

  public get current(): Song | undefined {
    return this._current;
  }

  public get hasLoaded(): boolean {
    return this._buffer !== null;
  }

  public get isPlaying(): boolean {
    return this._isPlaying;
  }
}
