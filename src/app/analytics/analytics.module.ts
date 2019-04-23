import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { FlexLayoutModule } from '@angular/flex-layout';

import { CdkTableModule } from '@angular/cdk/table';

import {
  MatButtonModule,
  MatCardModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatInputModule,
  MatPaginatorModule, MatSnackBarModule,
  MatTableModule,
  MatTabsModule
} from '@angular/material';

import { NgxChartsModule } from '@swimlane/ngx-charts';

import { OwlDateTimeModule } from 'ng-pick-datetime';
import { OwlMomentDateTimeModule } from 'ng-pick-datetime/date-time/adapter/moment-adapter/moment-date-time.module';

import { RiskResService } from '../../api/risk_res/risk_res.service';
import { RiskResDataComponent } from '../risk-res-data/risk-res-data.component';
import { AnalyticsService } from '../../api/analytics/analytics.service';
import { AnalyticsComponent } from './analytics.component';
import { analyticsRoutes } from './analytics.routes';
import { SurveyDataComponent } from '../survey-data/survey-data.component';


@NgModule({
  declarations: [AnalyticsComponent, RiskResDataComponent, SurveyDataComponent],
  imports: [
    CommonModule, FormsModule, RouterModule, RouterModule.forChild(analyticsRoutes),
    FlexLayoutModule,
    CdkTableModule,
    MatButtonModule, MatCardModule, MatExpansionModule, MatFormFieldModule, MatSnackBarModule,
    MatInputModule, MatPaginatorModule, MatTableModule, MatTabsModule,
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
