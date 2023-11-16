import { getMovie } from '^/app/services/api.service';

export default async function MoviePage({ params }: { params: { movieId: string } }) {
  const movie = await getMovie(params.movieId);

  if (movie === null) {
    return null;
  }
  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-wrap">
        <div className="w-full md:w-1/3 lg:w-1/4">
          <img className="w-full h-auto rounded-lg shadow-lg" src={movie.poster} alt="Movie Poster" />
        </div>

        <div className="w-full md:w-2/3 lg:w-3/4 p-4">
          <h2 className="text-3xl font-bold mb-4">{movie.title}</h2>

          <div className="flex items-center mb-4">
            <svg className="fill-current text-yellow-500 w-6 h-6 mr-2" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H7v-1h4v1zm4-2H7v-1h8v1zm0-2H7v-1h8v1zm0-2H7v-1h8v1zm-1-5v3H8v-3H5V7h5V6c0-1.1.9-2 2-2s2 .9 2 2v1h5v2h-3z"></path>
            </svg>
            <p className="text-lg font-semibold text-gray-700 mr-4">
              {movie.imdbrating} | {movie.imdbvotes} Voted
            </p>
            <p className="text-lg font-semibold text-gray-700 mr-4">{movie.rated}</p>
            <p className="text-base text-gray-600">{movie.genre}</p>
          </div>

          <p className="text-gray-700 text-lg mb-6">{movie.plot}</p>

          <div className="flex flex-wrap mb-6">
            <div className="w-full md:w-1/2 lg:w-1/3">
              <p className="text-gray-600">Release Date: {movie.released}</p>
            </div>
            <div className="w-full md:w-1/2 lg:w-1/3">
              <p className="text-gray-600">Duration: {movie.runtime}</p>
            </div>
            <div className="w-full md:w-1/2 lg:w-1/3">
              <p className="text-gray-600">{movie.language}</p>
              <p className="text-gray-600">{movie.country}</p>
            </div>
          </div>

          <div className="flex justify-between">
            <div>
              <h3 className="text-xl font-bold mb-2">Cast</h3>
              <ul className="list-disc pl-4">
                {movie.actors.split(', ').map(actor => (
                  <li key={actor}>{actor}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Directed By</h3>
              <ul className="list-disc pl-4">
                {movie.director.split(', ').map(director => (
                  <li key={director}>{director}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Written By</h3>
              <ul className="list-disc pl-4">
                {movie.writer.split(', ').map(writer => (
                  <li key={writer}>{writer}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
