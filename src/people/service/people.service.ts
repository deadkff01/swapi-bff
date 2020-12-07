import { Injectable, HttpService } from '@nestjs/common';
import { Observable, throwError, forkJoin } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PeopleResponse } from '../models/responses/people';
import { endpoint } from '../../utils/endpoint';
import { PeopleRequest } from '../models/requests/people';

@Injectable()
export class PeopleService {
  constructor(private readonly http: HttpService) {}

  /**
   * Get people from id
   */
  getPeopleById(id: string) {
    return this.http
      .get<PeopleResponse>(endpoint(`people/${id}`))
      .pipe(catchError((error) => throwError(error)));
  }

  loadMorePeople(request: PeopleRequest) {
    const { peopleArray, lastIndex } = request;
    const arrSlice = peopleArray.slice(lastIndex, lastIndex + 3);
    const requests = arrSlice.map((a: string) =>
      this.http.get(endpoint(`people/${a.split('/')[5]}`)),
    );

    return forkJoin(requests).pipe(catchError((error) => throwError(error)));
  }
}
