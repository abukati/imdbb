'use client';

import Link from 'next/link';
import { ChangeEvent, KeyboardEvent, useState } from 'react';
import { ISearchedMovie } from 'types';
import { useMoviesContext } from '../MoviesContext';

export default function Header({
  searchMovies
}: {
  searchMovies: (query: string) => Promise<ISearchedMovie[] | undefined>;
}): JSX.Element {
  const [query, setQuery] = useState('');
  const [_, setContext] = useMoviesContext();

  const handleMovieSearch = async () => {
    setContext(p => ({ ...p, status: 'pending', error: undefined }));
    const movies = await searchMovies(query);
    console.log(movies);
    if (movies === undefined || movies.length < 1) {
      setContext(p => ({ ...p, error: `Could not find movies named ${query}`, status: 'idle' }));
    }
    setContext(p => ({ ...p, movies, status: 'idle' }));
  };

  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const term = target.value;
    setQuery(term);
  };

  const handleEnterKey = (ev: KeyboardEvent<HTMLInputElement>) => {
    if (ev.key !== 'Enter') {
      return;
    }
    handleMovieSearch();
  };

  return (
    <header className="flex justify-between px-14 py-5">
      <Link className="text-red-500 text-3xl hover:cursor-pointer" href={'/'}>
        OMDB
      </Link>
      <nav>
        <input
          className="text-black"
          type="text"
          placeholder="Search for your movie..."
          value={query}
          onKeyUp={handleEnterKey}
          onChange={handleChange}
        />
        <button type="button" onClick={handleMovieSearch}>
          Search
        </button>
      </nav>
    </header>
  );
}
