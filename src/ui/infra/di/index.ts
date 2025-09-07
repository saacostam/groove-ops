import { LibraryUseCases } from "../../app/use-cases";
import { LibraryRepository } from "../repository";

// Repositories
const libraryRepository = new LibraryRepository();

// Use Cases
const libraryUseCases = new LibraryUseCases({
  libraryRepository,
})

export const Container = {
  libraryUseCases
}
