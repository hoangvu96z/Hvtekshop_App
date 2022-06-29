import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';

import { WoocommerceHelperService } from '../helper.service';
import { CreateNonce, CreateNonceRes, RegisterPayload, LoginPayload } from './auth.interface';
import { BehaviorSubject, Observable } from 'rxjs';

// Plugins used https://wordpress.org/plugins/json-api-user/

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<any>;
  private currentUser: Observable<any>;

  constructor(
    private httpClient: HttpClient,
    private wooHelper: WoocommerceHelperService
  ) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  createNonce(payload: CreateNonce): Observable<CreateNonceRes> {
    return this.httpClient.get(`api/get_nonce/`, {params: this.wooHelper.includeQuery(payload)})
      .pipe(catchError(err => this.wooHelper.handleError(err)));
  }

  register(registerData: any): Observable<any> {
    return this.httpClient.post(`/wp-json/wp/v2/users`, registerData)
      .pipe(catchError(err => this.wooHelper.handleError(err)));
  }

  retrievePassword(username: string): Observable<any> {
    const payload = this.wooHelper.includeEncoded({user_login: username});
    return this.httpClient.post(`api/user/retrieve_password/`, payload)
      .pipe(catchError(err => this.wooHelper.handleError(err)));
  }

  getAuthToken(payload: LoginPayload): Observable<any> {
    return this.httpClient.post(`wp-json/jwt-auth/v1/token`, payload)
    .pipe(catchError(err => this.wooHelper.handleError(err)));
  }

  generateAuthCookie(data: LoginPayload): Observable<any> {
    return this.httpClient.post(`api/user/generate_auth_cookie/`, this.wooHelper.includeEncoded(data))
      .pipe(catchError(err => this.wooHelper.handleError(err)));
  }

  login(email, password) {
      return this.httpClient.post<any>(`/?rest_route=/simple-jwt-login/v1/auth`, { email, password })
          .pipe(map(user => {
              // store user details and jwt token in local storage to keep user logged in between page refreshes
              localStorage.setItem('currentUser', JSON.stringify(user));
              this.currentUserSubject.next(user);
              return user;
          }));
  }

  logout() {
      // remove user from local storage and set current user to null
      localStorage.removeItem('currentUser');
      this.currentUserSubject.next(null);
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }
}
