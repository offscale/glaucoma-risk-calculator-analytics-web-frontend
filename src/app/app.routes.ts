import { Routes } from '@angular/router';

import { AuthGuard } from './auth/auth.guard';


export const appRoutes: Routes = [
  { path: 'auth', loadChildren: './auth/auth.module#AuthModule' },
  {
    path: 'admin', loadChildren: './admin/admin.module#AdminModule',
    canActivate: [AuthGuard], data: { role: ['admin'] }
  },
  {
    path: '', loadChildren: './secret-dashboard/secret-dashboard.module#SecretDashboardModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'analytics', loadChildren: './analytics/analytics.module#AnalyticsModule',
    canActivate: [AuthGuard]
  },
];

export const getRedirectUrl = (url: string): string | null => new URLSearchParams(url.slice(1)).get('redirectUrl');
