import { ApiProperty } from '@nestjs/swagger';

export class PeopleRequest {
  @ApiProperty()
  readonly peopleArray: [string];

  @ApiProperty()
  readonly lastIndex: number;
}
