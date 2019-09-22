import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FlexLayoutModule } from '@angular/flex-layout';

import { CdkTableModule } from '@angular/cdk/table';

import {
  MatButtonModule,
  MatCardModule,
  MatDatepickerModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatInputModule,
  MatPaginatorModule,
  MatSnackBarModule,
  MatTableModule,
  MatTabsModule
} from '@angular/material';

import { NgxChartsModule } from '@swimlane/ngx-charts';

import { RiskResService } from '../../api/risk_res/risk_res.service';
import { AnalyticsService } from '../../api/analytics/analytics.service';
import { PyAnalytics2Service } from '../../api/py_analytics2/py-analytics2.service';
import { PyAnalytics3Service } from '../../api/py_analytics3/py-analytics3.service';
import { RiskResDataComponent } from '../risk-res-data/risk-res-data.component';
import { SurveyDataComponent } from '../survey-data/survey-data.component';
import { DateRangeModule } from '../date-range/date-range.module';
import { MagTableComponent } from '../mag-table/mag-table.component';
import { CiTableComponent } from '../ci-table/ci-table.component';
import { NoTotalPipe } from '../no-total.pipe';
import { GraphvizModule } from '../graphviz/graphviz.module';
import { SvgViewerModule } from '../svg-viewer/svg-viewer.module';
import { AnalyticsComponent } from './analytics.component';
import { analyticsRoutes } from './analytics.routes';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../auth/auth.interceptors';


@NgModule({
  declarations: [
    RiskResDataComponent,
    SurveyDataComponent,
    AnalyticsComponent,
    MagTableComponent,
    CiTableComponent,
    NoTotalPipe
  ],
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule, RouterModule, RouterModule.forChild(analyticsRoutes),

    FlexLayoutModule,

    CdkTableModule,

    MatButtonModule, MatCardModule, MatDatepickerModule,
    MatExpansionModule, MatFormFieldModule, MatInputModule,
    MatPaginatorModule, MatSnackBarModule, MatTableModule,
    MatTabsModule, NgxChartsModule,

    DateRangeModule, GraphvizModule, SvgViewerModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    RiskResService, AnalyticsService, PyAnalytics2Service, PyAnalytics3Service
  ]
})
export class AnalyticsModule {}
