'use client';

import Link from 'next/link';
import { ISearchedMovie } from 'types';
import { useMoviesContext } from '../MoviesContext';
import SearchInput from '../SearchInput';

export default function Header({
  searchMovies
}: {
  searchMovies: (query: string) => Promise<ISearchedMovie[] | undefined>;
}): JSX.Element {
  const [{ status }, setContext] = useMoviesContext();

  const handleMovieSearch = async (query: string) => {
    if (status === 'pending') return;
    setContext(p => ({ ...p, status: 'pending', error: undefined }));
    const movies = await searchMovies(query);
    if (movies === undefined || movies.length < 1) {
      setContext(p => ({ ...p, error: `Could not find movies named ${query}`, status: 'idle' }));
    }
    setContext(p => ({ ...p, movies, status: 'idle' }));
  };

  return (
    <header className="flex justify-between px-14 py-5">
      <Link className="text-red-500 text-3xl hover:cursor-pointer" href={'/'}>
        OMDB
      </Link>
      <nav>
        <SearchInput handleMovieSearch={handleMovieSearch} />
      </nav>
    </header>
  );
}
