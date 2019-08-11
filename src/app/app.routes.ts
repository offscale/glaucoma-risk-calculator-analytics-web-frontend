import { Routes } from '@angular/router';

import { AuthGuard } from './auth/auth.guard';


export const appRoutes: Routes = [
  {
    path: '',
    loadChildren: () => import('./secret-dashboard/secret-dashboard.module').then(m => m.SecretDashboardModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    canActivate: [AuthGuard],
    data: { role: ['admin'] }
  },
  {
    path: 'analytics',
    loadChildren: () => import('./analytics/analytics.module').then(m => m.AnalyticsModule),
    canActivate: [AuthGuard]
  }
];
