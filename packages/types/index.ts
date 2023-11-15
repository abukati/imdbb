export interface OmdbResponse {
  Response?: string;
  Error?: string;
  Search?: ISearchedMovie[];
}

export interface IApiResponse<T> {
  status: number;
  data?: T;
  error?: Error;
}

export interface ISearchedMovie {
  title: string;
  year: string;
  imdbID: string;
  type: string;
  poster: string;
}

export interface IMovieProfile extends ISearchedMovie {
  rated: string;
  released: string;
  runtime: string;
  genre: string;
  director: string;
  writer: string;
  actors: string;
  plot: string;
  language: string;
  country: string;
  awards: string;
  ratings: IMovieRating[];
  metascore: string;
  imdbRating: string;
  imdbVotes: string;
  production: string;
  website: string;
  Response?: string;
  Error?: string;
}

interface IMovieRating {
  source: string;
  value: string;
}
