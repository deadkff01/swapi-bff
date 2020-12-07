import { Test, TestingModule } from '@nestjs/testing';
import { HttpModule } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { MoviesService } from '../service/movies.service';
import { allMovies } from '../../__mocks__/movies.mock';
import { MoviesMapper } from '../mappers/movies';
import { subscribeMock } from '../../utils/subscribeMock';

describe('Movies Controller', () => {
  let moviesController: MoviesController;
  let moviesService: MoviesService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [MoviesController],
      providers: [MoviesService],
    }).compile();

    moviesController = moduleRef.get<MoviesController>(MoviesController);
    moviesService = moduleRef.get<MoviesService>(MoviesService);
  });

  test('should create the service correctly', () => {
    expect(moviesService).toBeDefined();
  });

  test('get all movies', (done) => {
    const moviesMock = subscribeMock(200, allMovies);

    jest.spyOn(moviesService, 'getMovies').mockImplementation(() => moviesMock);
    moviesController.getMovies().subscribe((result) => {
      expect(result).toStrictEqual(
        MoviesMapper.allToResponse(allMovies.results as any),
      );
      done();
    });
  });

  test('get all movies error', (done) => {
    const error = {
      results: { statusCode: 500, message: 'Internal server error' },
    };
    const moviesMock = subscribeMock(500, error);
    jest.spyOn(moviesService, 'getMovies').mockImplementation(() => moviesMock);
    moviesController.getMovies().subscribe((result) => {
      expect(result).toStrictEqual(error.results as any);
      done();
    });
  });

  test('get movie by episodeId', (done) => {
    const movieMock = subscribeMock(
      200,
      allMovies.results.find((m) => m.episode_id === 6),
    );

    jest
      .spyOn(moviesService, 'getMovieById')
      .mockImplementation(() => movieMock);
    moviesController.getMovieById('3').subscribe((result) => {
      expect(result).toStrictEqual(
        MoviesMapper.toResponse(
          allMovies.results.find((m) => m.episode_id === 6) as any,
        ),
      );
      done();
    });
  });

  test('get movie by episodeId error', (done) => {
    const error = {
      status: 404,
      statusText: 'NOT FOUND',
    };
    const movieMock = subscribeMock(404, error);

    jest
      .spyOn(moviesService, 'getMovieById')
      .mockImplementation(() => movieMock);
    moviesController.getMovieById('8').subscribe((result) => {
      expect(result).toEqual(error);
      done();
    });
  });
});
