import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FlexLayoutModule } from '@angular/flex-layout';

import { CdkTableModule } from '@angular/cdk/table';

import { MatButtonModule, MatCardModule, MatPaginatorModule, MatTableModule, MatTabsModule } from '@angular/material';

import { NgxChartsModule } from '@swimlane/ngx-charts';

import { RiskResService } from '../../api/risk_res/risk_res.service';
import { RiskResValuesComponent } from './risk-res-values.component';
import { riskResValuesRoutes } from './risk-res-values.routes';
import { RiskResDataComponent } from '../risk-res-data/risk-res-data.component';


@NgModule({
  declarations: [RiskResValuesComponent, RiskResDataComponent],
  imports: [
    CommonModule, RouterModule, RouterModule.forChild(riskResValuesRoutes),
    FlexLayoutModule,
    CdkTableModule,
    MatButtonModule, MatCardModule, MatPaginatorModule, MatTableModule, MatTabsModule,
    NgxChartsModule
  ],
  exports: [RiskResValuesComponent],
  providers: [RiskResService]
})
export class RiskResValuesModule {}
