import { Test, TestingModule } from '@nestjs/testing';
import { HttpModule } from '@nestjs/common';
import { PeopleController } from './people.controller';
import { PeopleService } from '../service/people.service';
import { peopleMock } from '../../__mocks__/people.mock';
import { PeopleMapper } from '../mappers/people';
import { subscribeMock } from '../../utils/subscribeMock';

describe('Movies Controller', () => {
  let peopleController: PeopleController;
  let peopleService: PeopleService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [PeopleController],
      providers: [PeopleService],
    }).compile();

    peopleController = moduleRef.get<PeopleController>(PeopleController);
    peopleService = moduleRef.get<PeopleService>(PeopleService);
  });

  test('should create the service correctly', () => {
    expect(peopleService).toBeDefined();
  });

  test('get character by id', (done) => {
    const obiWanUrl = 'http://swapi.dev/api/people/10/';
    const obiWan = peopleMock.results.find((r) => r.url === obiWanUrl);
    const responseMock = subscribeMock(200, obiWan);

    jest
      .spyOn(peopleService, 'getPeopleById')
      .mockImplementation(() => responseMock);
    peopleController.getPeopleById('10').subscribe((result) => {
      expect(result).toStrictEqual(PeopleMapper.toResponse(obiWan));
      done();
    });
  });
});
