import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { Observable } from 'rxjs';

import { AuthService } from '../../../api/auth/auth.service';
import { IAuthReq, ILoginResp } from '../../../api/auth/auth.interfaces';
import { AlertsService } from '../../alerts/alerts.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  auth = new FormControl();
  form: FormGroup;

  constructor(private router: Router,
              private fb: FormBuilder,
              public authService: AuthService,
              private alertsService: AlertsService) { }

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  login() {
    (this.authService
      .login(this.form.value as IAuthReq) as Observable<ILoginResp>)
      .subscribe((user: ILoginResp) => {
          if (user.access_token == null) {
            this.alertsService.add('No access token; try logging in again');
            return;
          }

          this.authService.access_token = user.access_token;
          localStorage.setItem('access-token', this.authService.access_token);

          this.router
            .navigate(['/secret-dashboard'])
            .then(() => {});
        }
      );
  }
}
