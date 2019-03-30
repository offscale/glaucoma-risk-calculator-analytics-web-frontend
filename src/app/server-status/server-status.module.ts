import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material';

import { ServerStatusService } from '../../api/server-status/server-status.service';
import { ServerStatusComponent } from './server-status.component';


@NgModule({
  imports: [
    CommonModule,
    MatToolbarModule
  ],
  declarations: [ServerStatusComponent],
  providers: [ServerStatusService],
  exports: [ServerStatusComponent]
})
export class ServerStatusModule {}
