import "./style.css";
import "toastify-js/src/toastify.css";
import { LibraryView } from "./presentation/view";

const libraryViewRoot = document.querySelector<HTMLDivElement>("div#app")!;
new LibraryView({ root: libraryViewRoot });
