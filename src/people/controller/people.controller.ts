import {
  Controller,
  Get,
  Post,
  Logger,
  Param,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { PeopleService } from '../service/people.service';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import {
  ApiInternalServerErrorResponse,
  ApiTags,
  ApiOperation,
  ApiExtension,
  ApiOkResponse,
} from '@nestjs/swagger';
import { PeopleResponse } from '../models/responses/people';
import { PeopleMapper } from '../mappers/people';
import { PeopleRequest } from '../models/requests/people';

@Controller('people')
export class PeopleController {
  constructor(private readonly service: PeopleService) {}

  private readonly logger = new Logger();

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiTags('people')
  @ApiOkResponse({
    description: 'Returns a swapi people by id.',
    type: PeopleResponse,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @ApiOperation({ summary: 'Request to get a swapi people by id' })
  @ApiExtension('x-auth-type', 'None')
  getPeopleById(@Param('id') id: string): Observable<PeopleResponse> {
    return this.service.getPeopleById(id).pipe(
      map((response) => PeopleMapper.toResponse(response.data)),
      tap(() => this.logger.log(`get the people: ${id}`)),
    );
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiTags('people')
  @ApiOkResponse({
    description: 'Load more people, three at time.',
    type: PeopleResponse,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @ApiOperation({ summary: 'Request to load more poeple data from swapi' })
  @ApiExtension('x-auth-type', 'None')
  loadMorePeople(@Body() request: PeopleRequest): Observable<PeopleResponse[]> {
    return this.service.loadMorePeople(PeopleMapper.fromRequest(request)).pipe(
      map((response: any) =>
        response.map((r: any) => PeopleMapper.toResponse(r.data)),
      ),
      tap(() => this.logger.log(`load more people`)),
    );
  }
}
