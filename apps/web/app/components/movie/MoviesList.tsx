'use client';

import MovieCard from '^/app/components/movie/MovieCard';
import { useMoviesContext } from '../MoviesContext';

export default function MoviesList() {
  const [{ movies, status, error }] = useMoviesContext();

  if (status === 'pending') {
    return <>Loading...</>;
  }
  if (error !== undefined) {
    return <>{error}</>;
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {movies && movies.map(movie => <MovieCard key={movie.imdbid} movie={movie} />)}
    </div>
  );
}
