import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [MoviesController],
  providers: [MoviesService],
})
export class MoviesModule {}
