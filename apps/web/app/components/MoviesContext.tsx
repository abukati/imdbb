'use client';

import { Dispatch, SetStateAction, createContext, useContext, useState } from 'react';
import { IMoviesContext, MoviesProviderProps } from '^/types/movies_context';

export const MoviesContext = createContext<[IMoviesContext, Dispatch<SetStateAction<IMoviesContext>>]>([{}, () => {}]);

export default function MoviesProvider({ children, initialValue }: MoviesProviderProps) {
  const [context, setContext] = useState<IMoviesContext>(initialValue);
  return <MoviesContext.Provider value={[context, setContext]}>{children}</MoviesContext.Provider>;
}

export function useMoviesContext() {
  return useContext(MoviesContext);
}
