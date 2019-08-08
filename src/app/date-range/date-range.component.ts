import { AfterViewInit, Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { DateAdapter, MatSnackBar, NativeDateAdapter } from '@angular/material';

import { DatetimeAdapter, MAT_DATETIME_FORMATS, MAT_NATIVE_DATETIME_FORMATS, NativeDatetimeAdapter } from 'mat-datetimepicker/core';


@Component({
  selector: 'app-date-range',
  templateUrl: './date-range.component.html',
  providers: [
    {
      provide: DateAdapter,
      useClass: NativeDateAdapter
    },
    {
      provide: DatetimeAdapter,
      useClass: NativeDatetimeAdapter
    },
    {
      provide: MAT_DATETIME_FORMATS,
      useValue: MAT_NATIVE_DATETIME_FORMATS
    }
  ]
})
export class DateRangeComponent implements AfterViewInit {
  // tslint:disable-next-line:no-input-rename
  @Input('startDatetime')
  startDatetime: Date;

  // tslint:disable-next-line:no-input-rename
  @Input('endDatetime')
  endDatetime: Date;

  type = 'native';

  group: FormGroup;
  from_min = new Date('2016-09-02T12:10:00.000Z');
  to_min = new Date('2016-109-11T12:20:30.000Z');

  constructor(private fb: FormBuilder, private snackBar: MatSnackBar, private router: Router) {
    this.group = this.fb.group({
      startDatetime: [new Date('2017-11-09T12:10:00.000Z'), Validators.required],
      endDatetime: [new Date('2019-11-09T12:10:00.000Z'), Validators.required]
    });
  }

  ngAfterViewInit() {
    this.group.patchValue({ startDatetime: this.startDatetime, endDatetime: this.endDatetime });
  }

  submit() {
    const [startDatetime, endDatetime] = Object.keys(this.group.value).map(k => this.group.value[k].toISOString());
    if (startDatetime >= endDatetime) {
      this.snackBar.open('`startDatetime` is greater or equal to `endDatetime`');
      return;
    }
    this.router
      .navigate(
        ['/analytics'],
        { queryParams: { startDatetime, endDatetime } })
      .catch(console.error);
  }
}
