import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FlexLayoutModule } from '@angular/flex-layout';

import { CdkTableModule } from '@angular/cdk/table';

import { MatButtonModule, MatCardModule, MatPaginatorModule, MatTableModule, MatTabsModule } from '@angular/material';

import { NgxChartsModule } from '@swimlane/ngx-charts';

import { RiskResService } from '../../api/risk_res/risk_res.service';
import { RiskResDataComponent } from '../risk-res-data/risk-res-data.component';
import { AnalyticsService } from '../../api/analytics/analytics.service';
import { AnalyticsComponent } from './analytics.component';
import { analyticsRoutes } from './analytics.routes';


@NgModule({
  declarations: [AnalyticsComponent, RiskResDataComponent],
  imports: [
    CommonModule, RouterModule, RouterModule.forChild(analyticsRoutes),
    FlexLayoutModule,
    CdkTableModule,
    MatButtonModule, MatCardModule, MatPaginatorModule, MatTableModule, MatTabsModule,
    NgxChartsModule
  ],
  exports: [AnalyticsComponent],
  providers: [RiskResService, AnalyticsService]
})
export class AnalyticsModule {}
