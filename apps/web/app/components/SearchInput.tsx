'use client';

import { useState, ChangeEvent, KeyboardEvent, useRef } from 'react';
import debounce from 'lodash.debounce';

export default function SearchInput({ handleMovieSearch }: { handleMovieSearch: (query: string) => void }) {
  const [query, setQuery] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);
  const minQueryLength = 3;

  const debounceSearch = debounce(term => {
    handleMovieSearch(term);
  }, 400);

  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const term = target.value;
    setQuery(term);
    validateInput(term);
    if (term.length < minQueryLength) {
      return;
    }
    debounceSearch(term);
  };

  const handleEnterKey = (ev: KeyboardEvent<HTMLInputElement>) => {
    if (ev.key !== 'Enter' || query.length < minQueryLength) {
      return;
    }
    validateInput(query);
    handleMovieSearch(query);
  };

  const validateInput = (value: string) => {
    const inputEl = inputRef.current;
    if (inputEl === null) {
      return;
    }
    if (value.length < minQueryLength) {
      inputEl.classList.add('invalid-input');
    } else {
      inputEl.classList.remove('invalid-input');
    }
  };

  return (
    <>
      <input
        ref={inputRef}
        className="text-black py-2 px-4 border border-gray-300 rounded-l-md focus:outline-none focus:ring focus:border-blue-500"
        type="text"
        placeholder="Search for your movie..."
        value={query}
        onKeyUp={handleEnterKey}
        onChange={handleChange}
      />
      <div className="tooltip">Search term length must must not be less than {minQueryLength} characters!</div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-r-md focus:outline-none focus:ring focus:border-blue-50"
        type="button"
        onClick={() => handleMovieSearch(query)}
      >
        Search
      </button>
    </>
  );
}
