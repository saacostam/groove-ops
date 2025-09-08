import { Controller } from "../../domain/entities";
import type { LoadSongToDeckRequest } from "../dto";
import type { IAlertProvider } from "../provider";
import type { ILibraryRepository } from "../repository";

const webAudioCtx = new AudioContext();
const controller = new Controller(webAudioCtx);

export class ControllerUseCases {
  private readonly alertProvider: IAlertProvider;
  private readonly libraryRespository: ILibraryRepository;

  constructor(args: {
    alertProvider: IAlertProvider;
    libraryRepository: ILibraryRepository;
  }) {
    this.alertProvider = args.alertProvider;
    this.libraryRespository = args.libraryRepository;
  }

  async loadSongToDeck({ songId, deckNumber }: LoadSongToDeckRequest) {
    const song = this.libraryRespository.getSongById(songId);

    if (!song) {
      this.alertProvider.send({
        msg: "Song not found",
        type: "error",
      });
      return;
    }

    const deck = deckNumber === 1 ? controller.deckOne : controller.deckTwo;

    if (deck.currentSong && deck.currentSong.id === song.id) {
      this.alertProvider.send({
        msg: `Song ${song.name} is already loaded on deck ${deckNumber}`,
        type: "warning",
      });
      return;
    }

    deck.pause();
    deck.jumpTo(0);
    await deck.setSong(song);
    deck.play();
  }
}
