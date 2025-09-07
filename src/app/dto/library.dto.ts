export interface GetLibraryResponse {
  songs: {
    id: string;
    name: string;
    audioFile: string;
  }[];
}
