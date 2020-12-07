import { ApiProperty } from '@nestjs/swagger';

export interface IMovie {
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: string;
  characters: [];
}

export class MovieResponse {
  @ApiProperty()
  readonly title: string;

  @ApiProperty()
  readonly episode_id: number;

  @ApiProperty()
  readonly opening_crawl: string;

  @ApiProperty()
  readonly director: string;

  @ApiProperty()
  readonly producer: string;

  @ApiProperty()
  readonly release_date: string;

  @ApiProperty()
  readonly characters: [];

  constructor(data: IMovie) {
    Object.assign(this, data);
  }
}
