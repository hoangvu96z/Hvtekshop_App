import { Injectable } from '@angular/core';
import { Observable, throwError, timer } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { mergeMap, retryWhen } from 'rxjs/operators';
export const genericRetryStrategy = (
  {
    // original request + max retries = total requests made
    // retry 2x for a total of 3 requests made to server
    maxRetryAttempts = 2,
    scalingDuration = 1000,
  }: {
    maxRetryAttempts?: number;
    scalingDuration?: number;
  } = {}) => (attempts: Observable<any>) =>
  attempts.pipe(
    mergeMap((error, i) => {
      const retryAttempt = i + 1;
      // if maximum number of retries have been met
      // or response is a status code we don't wish to retry, throw error
      if (
        retryAttempt > maxRetryAttempts || error.status < 500
      ) {
        return throwError(error);
      }
      console.log(
        `Attempt ${retryAttempt}: retrying in ${retryAttempt *
        scalingDuration}ms`
      );
      // retry after 1s, 2s, etc...
      return timer(retryAttempt * scalingDuration);
    }),
    // finalize(() => console.log('We are done!'))
  );


const retryObservable = (httpObservable: Observable<any>, options: any = {}): Observable<any> =>
  httpObservable
    .pipe(
      retryWhen(genericRetryStrategy(options)),
    );


@Injectable({
  providedIn: 'root'
})
export class ConnnectionService {

  constructor(private httpClient: HttpClient) {
  }

  get = <T>(url: string, options: any = {}): Observable<any> =>
    this.handleHttp(this.httpClient.get(url, options));

  post = <T>(url: string, payload: any = {}, options: any = {}): Observable<any> =>
    this.handleHttp(this.httpClient.post<T>(url, payload, options));

  put = <T>(url: string, payload: any = {}, options: any = {}): Observable<any> =>
    this.handleHttp(this.httpClient.put<T>(url, payload, options));

  delete = <T>(url: string, options: any = {}): Observable<any> =>
    this.handleHttp(this.httpClient.delete<T>(url, options));

  private handleHttp = (httpObservable: Observable<any>, options: any = {}): Observable<any> =>
    retryObservable(httpObservable, options);
}

