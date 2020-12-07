import { ApiProperty } from '@nestjs/swagger';

export interface IPeople {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
}

export class PeopleResponse {
  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly height: string;

  @ApiProperty()
  readonly mass: string;

  @ApiProperty()
  readonly hair_color: string;

  @ApiProperty()
  readonly skin_color: string;

  @ApiProperty()
  readonly eye_color: string;

  @ApiProperty()
  readonly birth_year: string;

  @ApiProperty()
  readonly gender: string;

  constructor(data: IPeople) {
    Object.assign(this, data);
  }
}
