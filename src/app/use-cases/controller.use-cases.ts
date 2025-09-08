import { Controller } from "../../domain/entities";
import type {
  GetDeckRequest,
  GetDeckResponse,
  LoadSongToDeckRequest,
  PlayRequest,
  UpsertSubscriptionRequest,
} from "../dto";
import type { IAlertProvider } from "../provider";
import type { ILibraryRepository } from "../repository";

const webAudioCtx = new AudioContext();
const controller = new Controller(webAudioCtx);

export class ControllerUseCases {
  private readonly alertProvider: IAlertProvider;
  private readonly libraryRespository: ILibraryRepository;

  private _subscriptionCallbacksDeck1: UpsertSubscriptionRequest | undefined;
  private _subscriptionCallbacksDeck2: UpsertSubscriptionRequest | undefined;

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

    const subscriptionCallbacks =
      deckNumber === 1
        ? this._subscriptionCallbacksDeck1
        : this._subscriptionCallbacksDeck2;

    deck.pause();
    subscriptionCallbacks?.onPlaybackStatusChange?.("pause");
    deck.jumpTo(0);

    await deck.setSong(song);
    subscriptionCallbacks?.onSongChange?.(song);
  }

  getDeck({ deckNumber }: GetDeckRequest): GetDeckResponse {
    const deck = deckNumber === 1 ? controller.deckOne : controller.deckTwo;
    return {
      deck,
    };
  }

  upsertSubscription(
    deckNumber: 1 | 2,
    { onPlaybackStatusChange, onSongChange }: UpsertSubscriptionRequest
  ) {
    const subscriptionCallbacks =
      deckNumber === 1
        ? this._subscriptionCallbacksDeck1
        : this._subscriptionCallbacksDeck2;

    const newSubscriptionCallbacks = {
      onPlaybackStatusChange:
        onPlaybackStatusChange ?? subscriptionCallbacks?.onPlaybackStatusChange,
      onSongChange: onSongChange ?? subscriptionCallbacks?.onSongChange,
    };

    switch (deckNumber) {
      case 1: {
        this._subscriptionCallbacksDeck1 = newSubscriptionCallbacks;
        break;
      }
      case 2: {
        this._subscriptionCallbacksDeck2 = newSubscriptionCallbacks;
        break;
      }
    }
  }

  play({ deckNumber }: PlayRequest) {
    switch (deckNumber) {
      case 1: {
        controller.deckOne.play();
        this._subscriptionCallbacksDeck1?.onPlaybackStatusChange?.("play");
        break;
      }
      case 2: {
        controller.deckTwo.play();
        this._subscriptionCallbacksDeck2?.onPlaybackStatusChange?.("play");
      }
    }
  }
}
