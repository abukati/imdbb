import type { IApiResponse, IMovieProfile, ISearchedMovie } from 'types';

// TODO: Implement debounce searching
export async function searchMovies(query: string): Promise<ISearchedMovie[] | null> {
  const response = await fetch(`${process.env.API_BASE_URL}/movies/?query=${query}`, { cache: 'no-cache' });

  const json = (await response.json()) as IApiResponse<ISearchedMovie[]>;
  if (json.error || json.data === undefined) {
    return null;
  }
  return json.data;
}

export async function getMovie(id: string): Promise<IMovieProfile | null> {
  const response = await fetch(`${process.env.API_BASE_URL}/movies/${id}`);

  const json = (await response.json()) as IApiResponse<IMovieProfile>;
  if (json.error || json.data === undefined) {
    return null;
  }
  return json.data;
}
