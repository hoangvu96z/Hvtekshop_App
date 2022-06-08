/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable max-len */
/* eslint-disable guard-for-in */
/* eslint-disable no-underscore-dangle */
/* eslint-disable object-shorthand */
/* eslint-disable quote-props */
/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import {
  HTTP_INTERCEPTORS,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import * as OAuth from 'oauth-1.0a';
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';

@Injectable()
export class HttpBaseApiInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const oauth = new OAuth({
      consumer: {
          key: environment.woocommerce.consumer_key,
          secret: environment.woocommerce.consumer_secret
      },
      signature_method: 'HMAC-SHA1',
      // eslint-disable-next-line arrow-body-style
      hash_function: (base_string, key) => {
          return CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA1(base_string, key));
      }
  });
    if (request.url.includes('/wp/' || '/simple-jwt-login/')) {
      request = request.clone({
        url: `${environment.origin}${request.url}`,
        setHeaders : {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      });
    } else {
      const requestData = {
        url: `${environment.origin}${environment.wcEndpoint}/${request.url}`,
        method: request.method
      };
      const oauthData = oauth.authorize(requestData);
      const params = {};
      for (const property in oauthData) {
        params[property] = oauthData[property];
      }
      request = request.clone({
        url : `${environment.origin}${environment.wcEndpoint}/${request.url}`,
        setHeaders : {
          'Content-Type': 'application/json; charset=UTF-8',
        },
        setParams : params,
      });
    }
    return next.handle(request);
  }
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const HeaderBaseApiInterceptorProvider: any = {
  provide: HTTP_INTERCEPTORS,
  useClass: HttpBaseApiInterceptor,
  multi: true,
};
