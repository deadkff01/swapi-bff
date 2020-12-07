import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import {
  peopleMock,
  loadMorePostBody,
  peopleThePhantomMenace,
} from '../src/__mocks__/people.mock';

describe('PeopleController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  test('/people (GET)', () => {
    const obiWanUrl = 'http://swapi.dev/api/people/10/';
    const obiWan = peopleMock.results.find((r) => r.url === obiWanUrl);
    return request(app.getHttpServer())
      .get('/people/10')
      .expect(200)
      .expect(obiWan);
  });

  test('/people load more people (POST)', () => {
    return request(app.getHttpServer())
      .post('/people')
      .expect(200)
      .set('Accept', 'application/json')
      .send(loadMorePostBody)
      .expect(peopleThePhantomMenace);
  });
});
