'use client';

import Link from 'next/link';
import { ISearchedMovie } from 'types';

export default function MovieCard({ movie }: { movie: ISearchedMovie }) {
  return (
    <Link
      className="max-w-xs bg-white text-black shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 animate-fade-in"
      href={`/movies/${movie.imdbid}`}
    >
      <img className="w-full h-64 object-cover" src={movie.poster} alt="Movie Poster" />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{movie.title}</div>
        <p className="text-gray-700 text-base">
          <span className="mr-2">Year:</span> {movie.year}
        </p>
      </div>
    </Link>
  );
}
