import { Controller, Get, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('movies')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  searchMovies(@Query('query') query: string) {
    return this.appService.searchMovies(query);
  }

  @Get(':id')
  getMovie(@Param('id') id: string) {
    return this.appService.getMovie(id);
  }
}
