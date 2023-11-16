export interface IApiResponse<T> {
  status: number;
  data?: T;
  error?: Error;
}

export interface IUppercasedJson {
  [key: string]: any;
}

export interface ISearchedMovie {
  title: string;
  year: string;
  imdbid: string;
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
  imdbrating: string;
  imdbvotes: string;
  production: string;
  website: string;
  response?: string;
  error?: string;
}

interface IMovieRating {
  source: string;
  value: string;
}
