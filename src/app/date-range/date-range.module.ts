import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FlexModule } from '@angular/flex-layout';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MAT_DATE_LOCALE } from '@angular/material/core';

import { MatDatetimepickerModule, MatNativeDatetimeModule } from 'mat-datetimepicker/core';

import { DateRangeComponent } from './date-range.component';


@NgModule({
  declarations: [DateRangeComponent],
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule,

    FlexModule,

    MatButtonModule, MatFormFieldModule, MatInputModule,

    MatDatetimepickerModule, MatNativeDatetimeModule
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'en-AU'
    },
    {
      provide: MAT_DATE_LOCALE,
      useExisting: LOCALE_ID
    }
  ],
  exports: [DateRangeComponent]
})
export class DateRangeModule {}
