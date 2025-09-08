import { Container } from "../../infra/di";

export class LibraryView {
  private readonly root: HTMLDivElement;

  constructor(args: { root: HTMLDivElement }) {
    this.root = args.root;
    this.updateLibraryView();
  }

  updateLibraryView() {
    const library = Container.libraryUseCases.getLibrary();
    const newRoot = document.createElement("div");

    // Header
    const h2 = document.createElement("h2");
    h2.textContent = "Library";
    h2.classList.add("text-center");
    newRoot.appendChild(h2);

    // Songs List
    const songsList = document.createElement("div");
    songsList.classList.add(
      "flex",
      "flex-col",
      "gap",
      "rounded",
      "bg-base-2",
      "p-4"
    );
    for (const song of library.songs) {
      songsList.append(this._getSongView(song));
    }
    newRoot.appendChild(songsList);

    this.root.firstChild?.replaceWith(newRoot);
  }

  _getSongView(
    song: ReturnType<
      typeof Container.libraryUseCases.getLibrary
    >["songs"][number]
  ): HTMLDivElement {
    const root = document.createElement("div");
    root.classList.add(
      "flex",
      "flex-row",
      "justify-between",
      "rounded",
      "bg-base-3",
      "p-4"
    );

    const span = document.createElement("span");
    span.textContent = song.name;
    root.appendChild(span);

    // Button Container
    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("flex", "flex-row", "gap");

    const deck1 = document.createElement("button");
    deck1.textContent = "Deck 1";
    deck1.onclick = () =>
      Container.deckUseCases.loadSongToDeck({
        songId: song.id,
        deckNumber: 1,
      });
    buttonContainer.appendChild(deck1);

    const deck2 = document.createElement("button");
    deck2.textContent = "Deck 2";
    deck2.onclick = () =>
      Container.deckUseCases.loadSongToDeck({
        songId: song.id,
        deckNumber: 2,
      });
    buttonContainer.appendChild(deck2);

    root.appendChild(buttonContainer);
    // End of Button Container

    return root;
  }
}
