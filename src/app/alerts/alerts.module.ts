import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatSnackBarModule } from '@angular/material';

import { AlertsService } from './alerts.service';


@NgModule({
  imports: [
    CommonModule, MatSnackBarModule
  ],
  declarations: []
})
export class AlertsModule {
  public static forRoot(): ModuleWithProviders {
    return { ngModule: AlertsModule, providers: [AlertsService] };
  }
}
