'use client';
import { ChangeEvent, useState } from 'react';

export default function SearchInput({ handleMovieSearch }: { handleMovieSearch: (query: string) => void }) {
  const [query, setQuery] = useState('');

  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const term = target.value;
    setQuery(term);
  };

  return (
    <>
      <input
        className="text-black"
        type="text"
        placeholder="Search for your movie..."
        value={query}
        onChange={handleChange}
      />
      <button type="button" onClick={() => handleMovieSearch(query)}>
        Search
      </button>
    </>
  );
}
