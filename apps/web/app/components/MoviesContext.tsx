'use client';

import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState } from 'react';
import { ISearchedMovie } from 'types';

interface MoviesContext {
  searchTerm?: '';
  movies?: ISearchedMovie[];
  status?: 'idle' | 'pending';
  error?: string;
}
export const MoviesContext = createContext<[MoviesContext, Dispatch<SetStateAction<MoviesContext>>]>([{}, () => {}]);

export default function MoviesProvider({ children }: { children: ReactNode }) {
  const [context, setContext] = useState<MoviesContext>({
    movies: [],
    status: 'idle'
  });
  return <MoviesContext.Provider value={[context, setContext]}>{children}</MoviesContext.Provider>;
}

export function useMoviesContext() {
  return useContext(MoviesContext);
}
