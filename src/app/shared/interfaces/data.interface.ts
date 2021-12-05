export interface APIResponse<T> {
  results: T;
}

export interface DataResponse {
  characters: APIResponse<Character[]>;
  episodes: APIResponse<Episode[]>;
}

export interface Episode {
  name: string;
  episode: string;
}

export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  gender: string;
  image: string;
  isFavorite?: boolean;
}
