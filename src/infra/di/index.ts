import { ControllerUseCases, LibraryUseCases } from "../../app/use-cases";
import { AlertProvider } from "../provider";
import { LibraryRepository } from "../repository";

// Repositories
const libraryRepository = new LibraryRepository();

// Providers
const alertProvider = new AlertProvider();

// Use Cases
const deckUseCases = new ControllerUseCases({
  libraryRepository,
  alertProvider,
})

const libraryUseCases = new LibraryUseCases({
  libraryRepository,
})

export const Container = {
  deckUseCases,
  libraryUseCases,
}
