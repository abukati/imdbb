import { Controller, Get, Param, Query } from '@nestjs/common';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  searchMovies(@Query('query') query: string) {
    return this.moviesService.searchMovies(query);
  }

  @Get(':id')
  getMovie(@Param('id') id: string) {
    return this.moviesService.getMovie(id);
  }
}
