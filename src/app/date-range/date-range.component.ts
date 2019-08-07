import { AfterViewInit, Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { DateAdapter, MatSnackBar, NativeDateAdapter } from '@angular/material';

import { DatetimeAdapter, MAT_DATETIME_FORMATS, MAT_NATIVE_DATETIME_FORMATS, NativeDatetimeAdapter } from 'mat-datetimepicker/core';
import { Router } from '@angular/router';


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
  @Input('from')
  from: Date;

  // tslint:disable-next-line:no-input-rename
  @Input('to')
  to: Date;

  type = 'native';

  group: FormGroup;
  from_min = new Date('2016-09-02T12:10:00.000Z');
  to_min = new Date('2016-109-11T12:20:30.000Z');

  constructor(private fb: FormBuilder, private snackBar: MatSnackBar, private router: Router) {
    this.group = this.fb.group({
      from: [new Date('2017-11-09T12:10:00.000Z'), Validators.required],
      to: [new Date('2019-11-09T12:10:00.000Z'), Validators.required]
    });
  }

  ngAfterViewInit() {
    this.group.patchValue({ from: this.from, to: this.to });
  }

  submit() {
    const [from, to] = Object.keys(this.group.value).map(k => this.group.value[k].toISOString());
    if (from >= to) {
      this.snackBar.open('from-date is greater or equal to to-date');
      return;
    }
    this.router
      .navigate(
        ['/analytics'],
        { queryParams: { from, to } })
      .catch(console.error);
  }
}
