export class Song {
  public readonly audioFile: string;
  public readonly id: string;
  public readonly name: string;

  constructor(args: {
    audioFile: string;
    id: string;
    name: string;
  }) {
    this.audioFile = args.audioFile;
    this.id = args.id;
    this.name = args.name;
  }
}
