import { Injectable, HttpService } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MovieResponse } from '../models/responses/movie';
import { endpoint } from '../../utils/endpoint';

@Injectable()
export class MoviesService {
  constructor(private readonly http: HttpService) {}
  /**
   * Get all films from swapi api
   */
  getMovies() {
    return this.http
      .get<MovieResponse[]>(endpoint('films'))
      .pipe(catchError((error) => throwError(error)));
  }

  /**
   * Get film from id
   */
  getMovieById(id: string) {
    return this.http
      .get<MovieResponse>(endpoint(`films/${id}`))
      .pipe(catchError((error) => throwError(error)));
  }
}
