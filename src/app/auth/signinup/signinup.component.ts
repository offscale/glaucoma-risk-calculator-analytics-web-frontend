import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { IAuthReq, ILoginResp } from '../../../api/auth/auth.interfaces';
import { AuthService } from '../../../api/auth/auth.service';
import { AlertsService } from '../../alerts/alerts.service';
import { getRedirectUrl } from '../../utils';



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

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngAfterViewInit(): void {
    if (AuthService.loggedIn())
      this.router
        .navigate([getRedirectUrl(location.href) || '/'])
        .then(() => {});
  }

  signInUp(): void {
    this.authService
      .signInUp(this.form.value as IAuthReq)
      .subscribe((user: IAuthReq | ILoginResp) => {
          if (user.hasOwnProperty('access_token')) {
            this.authService._login(user as ILoginResp);
            this.router.navigateByUrl(getRedirectUrl(location.href) || '/')
              .then(() => {})
              .catch(console.error);
          } else this.alertsService.add(`Unexpected: ${JSON.stringify(user)};`);
        }
      );
  }
}
