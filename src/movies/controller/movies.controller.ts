import {
  Controller,
  Get,
  Logger,
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { MoviesService } from '../service/movies.service';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import {
  ApiInternalServerErrorResponse,
  ApiTags,
  ApiOperation,
  ApiExtension,
  ApiOkResponse,
} from '@nestjs/swagger';
import { MovieResponse } from '../models/responses/movie';
import { MoviesMapper } from '../mappers/movies';

@Controller('movies')
export class MoviesController {
  constructor(private readonly service: MoviesService) {}

  private readonly logger = new Logger();

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiTags('movies')
  @ApiOkResponse({
    description: 'Returns all swapi films.',
    type: [MovieResponse],
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @ApiOperation({ summary: 'Request to get all swapi films' })
  @ApiExtension('x-auth-type', 'None')
  getMovies(): Observable<MovieResponse[]> {
    return this.service.getMovies().pipe(
      map((response: any) => MoviesMapper.allToResponse(response.data.results)),
      tap(() => this.logger.log('get all movies')),
    );
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiTags('movies')
  @ApiOkResponse({
    description: 'Returns a swapi film by id.',
    type: MovieResponse,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @ApiOperation({ summary: 'Request to get a swapi film by id' })
  @ApiExtension('x-auth-type', 'None')
  getMovieById(@Param('id') episodeId: string): Observable<MovieResponse> {
    return this.service.getMovieById(episodeId).pipe(
      map((response) => MoviesMapper.toResponse(response.data)),
      tap(() => this.logger.log(`get the movie: ${episodeId}`)),
    );
  }
}
