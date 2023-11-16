import { searchMovies } from '@/services/api.service';
import MoviesList from '^/app/components/movie/MoviesList';

// TODO: Implement search bar
export default async function Homepage(): Promise<JSX.Element | null> {
  const movies = await searchMovies('fury');

  if (movies === null) {
    return null;
  }
  return (
    <div className="container mx-auto p-4">
      {/* TODO: Implement sorting */}
      <MoviesList movies={movies} />
    </div>
  );
}
