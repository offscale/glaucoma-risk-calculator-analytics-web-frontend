import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { FlexLayoutModule } from '@angular/flex-layout';

import { CdkTableModule } from '@angular/cdk/table';

import {
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatPaginatorModule,
  MatTableModule,
  MatTabsModule
} from '@angular/material';

import { NgxChartsModule } from '@swimlane/ngx-charts';

import { OwlDateTimeModule } from 'ng-pick-datetime';

import { RiskResService } from '../../api/risk_res/risk_res.service';
import { RiskResDataComponent } from '../risk-res-data/risk-res-data.component';
import { AnalyticsService } from '../../api/analytics/analytics.service';
import { AnalyticsComponent } from './analytics.component';
import { analyticsRoutes } from './analytics.routes';
import { OwlMomentDateTimeModule } from 'ng-pick-datetime/date-time/adapter/moment-adapter/moment-date-time.module';


@NgModule({
  declarations: [AnalyticsComponent, RiskResDataComponent],
  imports: [
    CommonModule, FormsModule, RouterModule, RouterModule.forChild(analyticsRoutes),
    FlexLayoutModule,
    CdkTableModule,
    MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule, MatPaginatorModule, MatTableModule, MatTabsModule,
    NgxChartsModule,

    OwlDateTimeModule, OwlMomentDateTimeModule
    // MatMomentDateModule,

  ],
  // entryComponents: [AnalyticsComponent],
  bootstrap: [AnalyticsComponent],
  exports: [AnalyticsComponent],
  providers: [
    // MatDatepickerModule, MatMomentDateModule,
    RiskResService, AnalyticsService
  ]
})
export class AnalyticsModule {}
