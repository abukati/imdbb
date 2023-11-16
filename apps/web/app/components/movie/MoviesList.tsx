import MovieCard from '^/app/components/movie/MovieCard';
import { ISearchedMovie } from 'types';

export default async function MoviesList({ movies }: { movies: ISearchedMovie[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {movies.map(movie => (
        <MovieCard key={movie.imdbid} movie={movie} />
      ))}
    </div>
  );
}
