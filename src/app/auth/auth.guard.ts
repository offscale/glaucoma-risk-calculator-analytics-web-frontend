import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Params, Router, RouterStateSnapshot } from '@angular/router';

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

    const [url /* :string */, qp /* :URLSearchParams */] = ((question: number): [string, URLSearchParams] => {
      if (question < 0) return [state.url, new URLSearchParams()];
      return [state.url.slice(0, question), new URLSearchParams(state.url.slice(question + 1))];
    })(state.url.indexOf('?'));

    const msg = `${correctRole != null ? 'Only ' + next.data.role + ' can' : 'Auth required to'} view ${url}`;

    this.alertsService.add(msg);
    console.error(msg);

    if (correctRole != null) return false;

    qp.set('redirectUrl', url);

    const qp_a: Params = {};
    qp.forEach((k, v) => qp_a[v] = k);

    this.router
      .navigate(['/auth'],
        { queryParams: qp_a })
      .catch(console.error);
    return false;
  }
}
