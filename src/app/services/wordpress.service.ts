/* eslint-disable @typescript-eslint/naming-convention */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { WoocommerceHelperService } from './helper.service';

@Injectable({
  providedIn: 'root'
})
export class WordpressService {
  private WP_ENDPOINT  = environment.wpEndpoint;
  private JWT_ENP = environment.jwtEndpoint;
  constructor(
    public httpClient: HttpClient,
    public wooHelper: WoocommerceHelperService
    ) { }

  getUsers() {
    return this.httpClient.get<any>(`${this.WP_ENDPOINT}/users`)
      .pipe(catchError(err => this.wooHelper.handleError(err)));
  }

  createUser(data) {
    return this.httpClient.post<any>(`${this.WP_ENDPOINT}/users`, data)
      .pipe(catchError(err => this.wooHelper.handleError(err)));
  }

  checkUser(data) {
    return this.httpClient.post<any>(`${this.JWT_ENP}/auth`, data)
    .pipe(catchError(err => this.wooHelper.handleError(err)));
  }
}
