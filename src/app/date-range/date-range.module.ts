import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MAT_DATE_LOCALE, MatButtonModule, MatFormFieldModule, MatInputModule } from '@angular/material';

import { MatDatetimepickerModule, MatNativeDatetimeModule } from 'mat-datetimepicker/core';

import { DateRangeComponent } from './date-range.component';


@NgModule({
  declarations: [DateRangeComponent],
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule,

    MatFormFieldModule, MatInputModule,

    MatDatetimepickerModule, MatNativeDatetimeModule, MatButtonModule
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
