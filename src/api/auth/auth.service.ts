import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';

import { AlertsService } from '../../app/alerts/alerts.service';
import { IAuthReq, ILoginResp } from './auth.interfaces';


@Injectable()
export class AuthService {
  public access_token: string;
  public loggedIn = AuthService.loggedIn;

  constructor(private http: HttpClient,
              private router: Router,
              private alertsService: AlertsService) {
    const at = localStorage.getItem('access-token');
    if (at != null) this.access_token = at;
  }

  static getAccessToken(): string {
    return localStorage.getItem('access-token');
  }

  static loggedIn(): boolean {
    return AuthService.getAccessToken() !== null;
  }

  static hasRole(role: string): boolean {
    const at = AuthService.getAccessToken() || '';
    return at.indexOf(role) > -1;
  }

  logout() {
    localStorage.removeItem('access-token');
    localStorage.removeItem('user');
    this.router
      .navigate(['/'], this.router.url === '/auth/logout' ? {} : { queryParams: { redirectUrl: this.router.url } });
  }

  _login(login_resp: ILoginResp) {
    this.access_token = login_resp.access_token;
    localStorage.setItem('access-token', this.access_token);
  }

  public login(user: IAuthReq): Observable<ILoginResp> | /*ObservableInput<{}> |*/ void {
    localStorage.setItem('user', user.email);
    return this.http
      .post<ILoginResp>('/api/auth', user);
  }

  public register(user: IAuthReq): Observable<HttpResponse<IAuthReq>> {
    localStorage.setItem('user', user.email);
    return this.http.post<IAuthReq>('/api/user', user, { observe: 'response' });
  }

  public signinup(user: IAuthReq): Observable<IAuthReq | ILoginResp> {


    return (this.login(user) as Observable<ILoginResp>)
      .pipe(
        catchError((err: HttpErrorResponse) => {
            if (err && err.error && err.error.error_message && err.error.error_message === 'User not found')
              return this.register(user)
                .pipe(
                  map(o => Object.assign(o.body, { access_token: o.headers.get('X-Access-Token') }) as IAuthReq | ILoginResp)
                );
            // tslint:disable:no-unused-expression
            this.alertsService.add(err.error.error_message) === void 0 as any || throwError(err.error);
          }
        )
      );
  }
}
