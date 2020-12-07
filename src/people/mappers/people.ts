import { PeopleResponse, IPeople } from '../models/responses/people';
import { PeopleRequest } from '../models/requests/people';

export class PeopleMapper {
  static fromRequest(request: PeopleRequest): PeopleRequest {
    return {
      peopleArray: request.peopleArray,
      lastIndex: request.lastIndex,
    };
  }

  static toResponse(response: PeopleResponse): PeopleResponse {
    return new PeopleResponse(response as IPeople);
  }
}
