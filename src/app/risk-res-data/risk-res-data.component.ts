import { Component, Input } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';

import { TRiskResRow } from '../../api/risk_res/risk_res.services';


@Component({
  selector: 'app-risk-res-data',
  templateUrl: './risk-res-data.component.html',
  styleUrls: ['./risk-res-data.component.css']
})
export class RiskResDataComponent {
  // tslint:disable-next-line:no-input-rename
  @Input('dataSource')
  dataSource: MatTableDataSource<TRiskResRow>;

  displayedColumns: string[] = [
    'client_risk', 'age', 'gender', 'ethnicity', 'sibling', 'parent',
    'study', 'myopia', 'diabetes', 'createdAt', 'updatedAt'
  ];
}
