import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FlexLayoutModule } from '@angular/flex-layout';

import { CdkTableModule } from '@angular/cdk/table';

import {
  MatButtonModule,
  MatCardModule, MatDatepickerModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatInputModule,
  MatPaginatorModule, MatSnackBarModule,
  MatTableModule,
  MatTabsModule
} from '@angular/material';

import { NgxChartsModule } from '@swimlane/ngx-charts';

import { OwlDateTimeModule } from 'ng-pick-datetime';
import { OwlMomentDateTimeModule } from 'ng-pick-datetime-moment';

import { RiskResService } from '../../api/risk_res/risk_res.service';
import { RiskResDataComponent } from '../risk-res-data/risk-res-data.component';
import { AnalyticsService } from '../../api/analytics/analytics.service';
import { SurveyDataComponent } from '../survey-data/survey-data.component';
import { AnalyticsComponent } from './analytics.component';
import { analyticsRoutes } from './analytics.routes';
import { MatMomentDatetimeModule } from '@mat-datetimepicker/moment';
import { MatDatetimepickerModule } from '@mat-datetimepicker/core';
import { PyAnalyticsService } from '../../api/py_analytics/py-analytics.service';


@NgModule({
  declarations: [AnalyticsComponent, RiskResDataComponent, SurveyDataComponent],
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule,  RouterModule, RouterModule.forChild(analyticsRoutes),
    FlexLayoutModule,
    CdkTableModule,
    MatButtonModule, MatCardModule, MatExpansionModule, MatFormFieldModule, MatSnackBarModule,
    MatInputModule, MatPaginatorModule, MatTableModule, MatTabsModule,
    NgxChartsModule,
    MatDatepickerModule,

    // OwlDateTimeModule, OwlMomentDateTimeModule
    // MatMomentDateModule,
    MatMomentDatetimeModule,
    MatDatetimepickerModule
  ],
  // entryComponents: [AnalyticsComponent],
  bootstrap: [AnalyticsComponent],
  exports: [AnalyticsComponent],
  providers: [
    // MatDatepickerModule, MatMomentDateModule,
    RiskResService, AnalyticsService, PyAnalyticsService
  ]
})
export class AnalyticsModule {}
