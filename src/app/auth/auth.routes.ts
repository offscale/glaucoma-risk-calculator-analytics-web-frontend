import { Routes } from '@angular/router';

import { SigninupComponent } from './signinup/signinup.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';


export const authRoutes: Routes = [
  { path: '', component: SigninupComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent }
];
