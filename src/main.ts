import { Controller, Song } from "./ui/domain";
import "./style.css";
import { LibraryView } from "./ui/presentation/view";

const start = () => {
  const webAudioCtx = new AudioContext();
  const controller = new Controller(webAudioCtx);

  const song = new Song({
    audioFile: "/song.mp3",
    name: "Song 1",
  });

  controller.deckOne.setSong(song);
  controller.deckOne.play();
}

start();

const libraryViewRoot = document.querySelector<HTMLDivElement>("div#app")!;
new LibraryView({ root: libraryViewRoot })
