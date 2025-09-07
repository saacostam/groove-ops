import { Controller, Song } from "./entities";
import "./style.css";

const start = () => {
  const webAudioCtx = new AudioContext();
  const controller = new Controller(webAudioCtx);

  const song = new Song("/song.mp3");

  controller.deckOne.setSong(song);
  controller.deckOne.play();
}

start();
