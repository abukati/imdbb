import { ReactNode } from 'react';
import { ISearchedMovie } from 'types';

export interface IMoviesContext {
  searchTerm?: '';
  movies?: ISearchedMovie[];
  status?: 'idle' | 'pending';
  error?: string;
}

export interface MoviesProviderProps {
  children: ReactNode;
  initialValue: IMoviesContext;
}
