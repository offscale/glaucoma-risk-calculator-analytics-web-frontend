import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FlexLayoutModule } from '@angular/flex-layout';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';

import { AuthService } from '../../api/auth/auth.service';

import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { SigninupComponent } from './signinup/signinup.component';
import { LogoutComponent } from './logout/logout.component';

import { authRoutes } from './auth.routes';


@NgModule({
  imports: [
    CommonModule, RouterModule, RouterModule.forChild(authRoutes),
    FormsModule, ReactiveFormsModule,
    FlexLayoutModule,
    MatInputModule, MatCardModule, MatFormFieldModule, MatButtonModule
  ],
  providers: [AuthService],
  declarations: [
    SignupComponent, LoginComponent, SigninupComponent, LogoutComponent
  ]
})
export class AuthModule {
}
