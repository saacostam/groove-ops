import type { GetLibraryResponse } from "../dto";
import type { ILibraryRepository } from "../repository";

export class LibraryUseCases {
  private readonly libraryRepository: ILibraryRepository

  constructor(
    args: {
      libraryRepository: ILibraryRepository,
    }
  ) {
    this.libraryRepository = args.libraryRepository;
  }

  getLibrary(): GetLibraryResponse {
    const songs = this.libraryRepository.getAllSongs();
    return {
      songs,
    }
  }
}
