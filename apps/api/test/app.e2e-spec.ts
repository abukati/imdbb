import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { MoviesModule } from '../src/movies/movies.module';

describe('MoviesController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [MoviesModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('movies/ (GET)', () => {
    return request(app.getHttpServer()).get('/movies/23').expect(404);
  });

  it('movies/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/movies?query=spiderman')
      .expect(200);
  });
});
