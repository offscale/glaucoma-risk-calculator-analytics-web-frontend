import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { IAuthReq, ILoginResp } from '../../../api/auth/auth.interfaces';
import { AuthService } from '../../../api/auth/auth.service';
import { AlertsService } from '../../alerts/alerts.service';
import { getRedirectUrl } from '../../app.routes';


@Component({
  selector: 'app-signinup',
  templateUrl: './signinup.component.html',
  styleUrls: ['./signinup.component.css']
})
export class SigninupComponent implements OnInit, AfterViewInit {
  auth = new FormControl();
  form: FormGroup;

  constructor(private router: Router,
              private fb: FormBuilder,
              public authService: AuthService,
              private alertsService: AlertsService) {}

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngAfterViewInit() {
    if (AuthService.loggedIn())
      this.router
        .navigate([getRedirectUrl(location.href) || '/secret-dashboard'])
        .then(() => {});
  }

  signInUp() {
    this.authService
      .signinup(this.form.value as IAuthReq)
      .subscribe((_user: IAuthReq | ILoginResp) => {
          if (_user.hasOwnProperty('access_token')) {
            this.authService._login(_user as ILoginResp);
            this.router.navigateByUrl(getRedirectUrl(location.href) || '/secret-dashboard')
              .then(() => {})
              .catch(console.error);
          } else this.alertsService.add(`Unexpected: ${JSON.stringify(_user)};`);
        }
      );
  }
}
