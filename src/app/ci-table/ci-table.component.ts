import { Component, Input } from '@angular/core';
import { IPyAnalytics2Response } from '../../api/py_analytics2/analytics.services';
import { all, create } from 'mathjs';

const math = create(all);
math.config({
  number: 'BigNumber',  // Default type of number:
                        // 'number' (default), 'BigNumber', or 'Fraction'
  precision: 2         // Number of significant digits for BigNumbers
});

@Component({
  selector: 'app-ci-table',
  templateUrl: './ci-table.component.html',
  styleUrls: ['./ci-table.component.css']
})
export class CiTableComponent {
  displayedColumns: string[] = [
    // 'Total', 'Number (%)', '95 % CI', 'p-value (Pearson\'s chi-square)'
    'gender', 'age_mag', 'client_risk_mag', 'behaviour_change'
  ];

  percent(a: number | any, b: number | any): number {
    if (typeof a !== 'number' || typeof b !== 'number')
      return a;
    return math.format(math.multiply(math.divide(a, b), 100), 4);
  }

  // tslint:disable-next-line:no-input-rename
  @Input('dataSource')
    // dataSource: MatTableDataSource<IPyAnalytics2Response['counts']>;
  dataSource: IPyAnalytics2Response['counts'];
}
