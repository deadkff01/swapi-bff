import { MovieResponse, IMovie } from '../models/responses/movie';

export class MoviesMapper {
  static allToResponse(response: MovieResponse[]): MovieResponse[] {
    return response as MovieResponse[];
  }

  static toResponse(response: MovieResponse): MovieResponse {
    return new MovieResponse(response as IMovie);
  }
}
