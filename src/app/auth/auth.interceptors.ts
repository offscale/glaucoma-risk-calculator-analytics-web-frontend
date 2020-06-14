import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthService } from '../../api/auth/auth.service';
import { AlertsService } from '../alerts/alerts.service';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router,
              private alertsService: AlertsService) {
  }

  intercept(req: HttpRequest<any>,
            next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(AuthService.loggedIn() ?
      req.clone({ headers: req.headers.set('X-Access-Token', AuthService.getAccessToken()) })
      : req)
      .pipe(
        catchError((err: any, caught) => {
          if (err instanceof HttpErrorResponse)
            switch (err.status) {
              case 403:
                if (!this.router.isActive('auth', false)
                /*err.error.message === 'NotFound: X-Access-Token header must be included'*/) {
                  this.alertsService.add('Authentication required');

                  this.router
                    .navigate(['auth'], { queryParams: { redirectUrl: this.router.url } })
                    .then(success =>
                      success || this.alertsService.add('Unable to route to /auth'))
                    .catch(throwError);
                } else if (this.router.url.indexOf('auth') < 0)
                  this.alertsService.add({
                    code: err.status,
                    message: err.error.message
                  });
                break;
              default:
                /*this.alertsService.add({
                  code: err.status,
                  message: err.error.message
                });*/
                return throwError(err);
            }
          //  if (err.status === 403)
          return throwError(err);
        })
      );
  }
}
