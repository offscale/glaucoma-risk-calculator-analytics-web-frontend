import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { URLSearchParams } from '@angular/http';

import { Observable } from 'rxjs';

import { AuthService } from '../../api/auth/auth.service';
import { AlertsService } from '../alerts/alerts.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router,
              private alertsService: AlertsService) {}

  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const correctRole = next.data && next.data.role ? AuthService.hasRole(next.data.role) : null;
    if (AuthService.loggedIn() && (correctRole == null || correctRole))
      return true;

    const [url /* :string */, qp /*URLSearchParams['paramsMap']*/] = ((question: number): [string, URLSearchParams['paramsMap']] => {
      if (question < 0) return [state.url, new Map<string, string[]>()];
      return [state.url.slice(0, question), new URLSearchParams(state.url.slice(question + 1)).paramsMap];
    })(state.url.indexOf('?'));

    const msg = `${correctRole != null ? 'Only ' + next.data.role + ' can' : 'Auth required to'} view ${url}`;

    this.alertsService.add(msg);
    console.error(msg);

    if (correctRole != null) return false;

    qp.set('redirectUrl', [url]);
    const queryParams = Array.from(qp)
      .reduce((obj, [key, value]) => (
        key !== 'redirectUrl' || value[0] !== '/auth' ?
          Object.assign(obj, { [key]: value[0] }) : obj
      ), {});
    this.router
      .navigate(['/auth'],
        { queryParams }); // .then(() => {});
    return false;
  }
}
