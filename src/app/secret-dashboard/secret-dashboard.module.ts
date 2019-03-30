import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FlexLayoutModule } from '@angular/flex-layout';

import { MatButtonModule, MatCardModule } from '@angular/material';

import { SecretDashboardComponent } from './secret-dashboard.component';
import { secretDashboardRoutes } from './secret-dashboard.routes';


@NgModule({
  imports: [
    CommonModule, RouterModule, RouterModule.forChild(secretDashboardRoutes),
    FlexLayoutModule,
    MatButtonModule, MatCardModule
  ],
  declarations: [SecretDashboardComponent]
})
export class SecretDashboardModule {}
