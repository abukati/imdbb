import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    searchMovies(query: string): Promise<import("types").IApiResponse<import("types").ISearchedMovie[]>>;
    getMovie(id: string): Promise<import("types").IApiResponse<import("types").IMovieProfile>>;
}
