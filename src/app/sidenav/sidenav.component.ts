import { AfterContentInit, Component, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material';

import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthService } from '../../api/auth/auth.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements AfterContentInit {
  loggedIn: typeof AuthService.loggedIn;
  hasRole: typeof AuthService.hasRole;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(map(result => result.matches));

  @Input() openedSubject: Subject<boolean>;
  @ViewChild('sidenav') sidenav: MatSidenav;

  constructor(private breakpointObserver: BreakpointObserver,
              private router: Router) {
    this.loggedIn = AuthService.loggedIn;
    this.hasRole = AuthService.hasRole;
  }

  ngAfterContentInit() {
    this.openedSubject.subscribe(
      open => this.sidenav[open ? 'open' : 'close']()
    );
    this.router.events.subscribe(() => this.openedSubject.next(false));
  }

  toggle() {
    this.openedSubject.next(!this.sidenav.opened);
  }
}
