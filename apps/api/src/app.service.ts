import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  IApiResponse,
  IMovieProfile,
  ISearchedMovie,
  OmdbResponse,
} from 'types';

@Injectable()
export class AppService {
  async searchMovies(query?: string): Promise<IApiResponse<ISearchedMovie[]>> {
    if (query === undefined) {
      throw new BadRequestException();
    }
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&s=${query}`,
      );
      const { Response, Search } = (await response.json()) as OmdbResponse;

      const isResponseOk = JSON.parse(Response.toLowerCase());
      if (!isResponseOk) {
        throw new NotFoundException();
      }

      const movies = Search;
      if (movies.length > 0) {
        return {
          status: 200,
          data: movies,
        };
      }

      throw new NotFoundException();
    } catch (error) {
      return {
        status: error.status,
        error: error.message,
      };
    }
  }

  async getMovie(id: string): Promise<IApiResponse<IMovieProfile>> {
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&i=${id}`,
      );
      const { Response, ...movie } = (await response.json()) as IMovieProfile;

      const isResponseOk = JSON.parse(Response.toLowerCase());
      if (!isResponseOk) {
        throw new NotFoundException();
      }

      return {
        status: 200,
        data: movie,
      };
    } catch (error) {
      return {
        status: error.status,
        error: error.message,
      };
    }
  }
}
