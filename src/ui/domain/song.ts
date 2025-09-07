export class Song {
  public readonly audioFile: string;
  public readonly name: string;

  constructor(args: {
    audioFile: string;
    name: string;
  }) {
    this.audioFile = args.audioFile;
    this.name = args.name;
  }
}
