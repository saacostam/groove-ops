import "./style.css";
import "toastify-js/src/toastify.css";
import { ControllerView, LibraryView } from "./presentation/view";

const libraryViewRoot = document.querySelector<HTMLDivElement>("div#library")!;
new LibraryView({ root: libraryViewRoot });

const controllerViewRoot =
  document.querySelector<HTMLDivElement>("div#controller")!;
new ControllerView({ root: controllerViewRoot });
