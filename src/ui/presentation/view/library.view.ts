import { Container } from"../../infra/di";

export class LibraryView {
  private readonly root: HTMLDivElement

  constructor(args: {
    root: HTMLDivElement,
  }) {
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
    songsList.classList.add("flex", "flex-col", "gap", "rounded", "bg-base-2", "p-4")
    for (const song of library.songs) {
      songsList.append(this._getSongView(song));
    }
    newRoot.appendChild(songsList);

    this.root.replaceWith(newRoot);
  }

  _getSongView(song: ReturnType<typeof Container.libraryUseCases.getLibrary>["songs"][number]): HTMLDivElement {
    const root = document.createElement("div");
    root.classList.add("flex", "flex-row", "justify-between", "rounded", "bg-base-3", "p-4");

    const span = document.createElement("span");
    span.textContent = song.name;
    root.appendChild(span);

    const button = document.createElement("button");
    button.textContent = "Play";
    button.onclick = () => console.log("Play");
    root.appendChild(button);

    return root;
  }
}
