import { IApiResponse, IMovieProfile, ISearchedMovie } from 'types';
export declare class AppService {
    searchMovies(query?: string): Promise<IApiResponse<ISearchedMovie[]>>;
    getMovie(id: string): Promise<IApiResponse<IMovieProfile>>;
}
