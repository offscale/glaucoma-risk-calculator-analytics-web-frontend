import { Component, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

import { IMag } from '../../api/py_analytics2/analytics.services';


@Component({
  selector: 'app-mag-table',
  templateUrl: './mag-table.component.html',
  styleUrls: ['./mag-table.component.css']
})
export class MagTableComponent {
  displayedColumns: string[] = ['high', 'med', 'low', 'lowest'];

  // tslint:disable-next-line:no-input-rename
  @Input('dataSource')
  dataSource: MatTableDataSource<IMag>;
}
