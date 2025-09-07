import "./style.css";
import { LibraryView } from "./ui/presentation/view";

const libraryViewRoot = document.querySelector<HTMLDivElement>("div#app")!;
new LibraryView({ root: libraryViewRoot })
