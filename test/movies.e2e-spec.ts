import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { allMovies } from '../src/__mocks__/movies.mock';

describe('MoviesController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  test('/movies (GET)', () => {
    return request(app.getHttpServer())
      .get('/movies')
      .expect(200)
      .expect(allMovies.results);
  });

  test('/movies/:episodeId (GET)', () => {
    return request(app.getHttpServer())
      .get('/movies/3')
      .expect(200)
      .expect(allMovies.results.find((r) => r.episode_id === 6));
  });
});
