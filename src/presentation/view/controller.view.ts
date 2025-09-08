import { Container } from "../../infra/di";

export class ControllerView {
  private readonly root: HTMLDivElement;

  constructor(args: { root: HTMLDivElement }) {
    this.root = args.root;
    this.updateControllerView();
  }

  updateControllerView() {
    const { deck: deck1 } = Container.deckUseCases.getDeck({ deckNumber: 1 });
    const { deck: deck2 } = Container.deckUseCases.getDeck({ deckNumber: 2 });

    const newRoot = document.createElement("div");

    // Header
    const h2 = document.createElement("h2");
    h2.textContent = "Controller";
    h2.classList.add("text-center");
    newRoot.appendChild(h2);

    // Decks
    const deckContainer = document.createElement("div");
    deckContainer.classList.add("flex", "flex-row", "gap");

    const deck1Root = this._getDeckView({
      deck: deck1,
      deckNumber: 1,
    });
    deckContainer.append(deck1Root);

    const deck2Root = this._getDeckView({
      deck: deck2,
      deckNumber: 2,
    });
    deckContainer.append(deck2Root);

    newRoot.append(deckContainer);

    this.root.firstChild?.replaceWith(newRoot);
  }

  _getDeckView(args: {
    deck: ReturnType<typeof Container.deckUseCases.getDeck>["deck"];
    deckNumber: 1 | 2;
  }): HTMLDivElement {
    const root = document.createElement("div");
    root.classList.add(
      "bg-base-2",
      "gap",
      "flex",
      "flex-col",
      "flex-1",
      "rounded",
      "p-4"
    );

    // Header
    const h3 = document.createElement("h3");
    h3.textContent = `Deck ${args.deckNumber}`;
    h3.classList.add("text-center");
    root.append(h3);

    // Content
    const contentRoot = document.createElement("div");
    contentRoot.classList.add(
      "flex",
      "flex-row",
      "gap",
      "justify-between",
      "rounded",
      "bg-base-3",
      "p-4"
    );

    const currentSongName = document.createElement("span");
    currentSongName.textContent = "(Empty)";
    currentSongName.classList.add("text-accent");
    contentRoot.append(currentSongName);

    const playbackButton = document.createElement("button");
    playbackButton.textContent = "Play";
    contentRoot.append(playbackButton);
    playbackButton.onclick = () => {
      Container.deckUseCases.play({
        deckNumber: args.deckNumber,
      });
    };

    Container.deckUseCases.upsertSubscription(args.deckNumber, {
      onSongChange: (song) => {
        currentSongName.textContent = song.name;
      },
      onPlaybackStatusChange: (status) => {
        playbackButton.textContent = status === "pause" ? "Play" : "Pause";
      },
    });

    root.append(contentRoot);

    return root;
  }
}
