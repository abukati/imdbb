import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import {
  IApiResponse,
  IMovieProfile,
  ISearchedMovie,
  IUppercasedJson,
} from 'types';
import { lowercaseJsonKeys } from './utils/lowercaseJson';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  async searchMovies(query?: string): Promise<IApiResponse<ISearchedMovie[]>> {
    if (query === undefined) {
      throw new BadRequestException();
    }
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&s=${query}`,
      );
      const json = (await response.json()) as IUppercasedJson;
      const { response: apiResponse, search: movies } = lowercaseJsonKeys(json);

      const isResponseOk =
        typeof apiResponse === 'boolean'
          ? apiResponse
          : JSON.parse(apiResponse.toLowerCase());
      if (!isResponseOk) {
        throw new NotFoundException();
      }

      if (movies.length > 0 && (movies satisfies ISearchedMovie[])) {
        return {
          status: 200,
          data: movies,
        };
      }

      throw new InternalServerErrorException();
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
      const json = (await response.json()) as IUppercasedJson;
      const { response: apiResponse, ...movie } = lowercaseJsonKeys(json);

      const isResponseOk =
        typeof apiResponse === 'boolean'
          ? apiResponse
          : JSON.parse(apiResponse.toLowerCase());
      if (!isResponseOk) {
        throw new NotFoundException();
      }

      if (validateMovieProfile(movie)) {
        return {
          status: 200,
          data: movie as IMovieProfile,
        };
      }

      throw new InternalServerErrorException();
    } catch (error) {
      return {
        status: error.status,
        error: error.message,
      };
    }
  }
}

function validateMovieProfile(obj: any): boolean {
  return typeof obj === 'object' &&
    obj !== null &&
    (obj satisfies IMovieProfile)
    ? true
    : false;
}
