import { IApiResponse, IMovieProfile, ISearchedMovie } from 'types';
export declare class AppService {
    private readonly logger;
    searchMovies(query?: string): Promise<IApiResponse<ISearchedMovie[]>>;
    getMovie(id: string): Promise<IApiResponse<IMovieProfile>>;
}
