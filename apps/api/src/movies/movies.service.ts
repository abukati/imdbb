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
import { lowercaseJsonKeys } from '../../utils/lowercaseJson';

@Injectable()
export class MoviesService {
  async fetchOmdb(querySlug: string) {
    const response = await fetch(
      `${process.env.OMDB_API_URL}/?apikey=${process.env.OMDB_API_KEY}${querySlug}`,
    );
    const json = (await response.json()) as IUppercasedJson;
    const { response: apiResponse, ...rest } = lowercaseJsonKeys(json);

    const isResponseOk =
      typeof apiResponse === 'boolean'
        ? apiResponse
        : JSON.parse(apiResponse.toLowerCase());
    if (!isResponseOk) {
      throw new NotFoundException();
    }

    return rest;
  }

  async searchMovies(query?: string): Promise<IApiResponse<ISearchedMovie[]>> {
    if (query === undefined) {
      throw new BadRequestException();
    }
    try {
      const { search: movies } = await this.fetchOmdb(`&s=${query}`);
      if (movies.length > 0 && validateMovieProfile<ISearchedMovie[]>(movies)) {
        return {
          status: 200,
          data: movies as ISearchedMovie[],
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
      const movie = await this.fetchOmdb(`&i=${id}`);

      if (validateMovieProfile<IMovieProfile>(movie)) {
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

function validateMovieProfile<T>(obj: any): boolean {
  return typeof obj === 'object' && obj !== null && (obj satisfies T)
    ? true
    : false;
}
