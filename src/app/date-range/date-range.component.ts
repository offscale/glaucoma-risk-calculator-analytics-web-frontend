import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import * as moment from 'moment-timezone';

import {
  DatetimeAdapter,
  MAT_DATETIME_FORMATS,
  MAT_NATIVE_DATETIME_FORMATS,
  MatDatetimepicker,
  NativeDatetimeAdapter
} from '@mat-datetimepicker/core';
import { DateAdapter, NativeDateAdapter } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';


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
export class DateRangeComponent implements OnInit, AfterViewInit {
  // tslint:disable-next-line:no-input-rename
  @Input('startDatetimeInput')
  startDatetimeInput: Date;

  // tslint:disable-next-line:no-input-rename
  @Input('endDatetimeInput')
  endDatetimeInput: Date;

  type = 'native';

  group: FormGroup;
  fromMin = new Date('2016-09-02T12:10:00.000Z');
  toMin = new Date('2016-109-11T12:20:30.000Z');

  @ViewChild('startDatetimeElem', { static: false })
  startDatetimeComponent: MatDatetimepicker<Date>;

  @ViewChild('endDatetimeElem', { static: false })
  endDatetimeComponent: MatDatetimepicker<Date>;

  period = '';

  constructor(private fb: FormBuilder, private snackBar: MatSnackBar, private router: Router) {
    this.group = this.fb.group({
      startDatetime: [new Date('2019-03-11T08:00:00+11:00'), Validators.required],
      endDatetime: [new Date('2019-03-11T15:00:00+11:00'), Validators.required]
    });
  }

  ngOnInit(): void {
    this.updateStore();
  }

  ngAfterViewInit(): void {
    this.group.patchValue({ startDatetime: this.startDatetimeInput, endDatetime: this.endDatetimeInput });
    this.updateStore();
    this.startDatetimeComponent.selectedChanged.subscribe(() => this.updateStore());
    this.endDatetimeComponent.selectedChanged.subscribe(() => this.updateStore());
  }

  submit(): void {
    const [startDatetime, endDatetime] = Object.keys(this.group.value).map(k => this.group.value[k].toISOString());
    this.updateStore();
    if (startDatetime >= endDatetime) {
      this.snackBar.open('`startDatetimeInput` is greater or equal to `endDatetimeInput`');
      return;
    }
    this.router
      .navigate(
        ['/analytics'],
        { queryParams: { startDatetime, endDatetime } })
      .catch(console.error);
  }

  updateStore(): void {
    Object.keys(this.group.value).forEach(k => this[k] = this.group.value[k]);
    this.period = moment(this.startDatetimeInput).from(this.endDatetimeInput).replace('ago', 'worth');
  }
}
