import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';

export const subscribeMock = (statusCode: number, data: any) =>
  new Observable<AxiosResponse<any>>((subscriber) => {
    subscriber.next({
      data,
      status: statusCode,
      statusText: 'test',
      headers: {},
      config: {},
    });
  });
