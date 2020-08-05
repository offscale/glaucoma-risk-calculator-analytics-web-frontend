import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';

import { ServerStatusModule } from '../server-status/server-status.module';
import { SidenavComponent } from './sidenav.component';
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
    imports: [
        CommonModule,

        MatButtonModule, MatListModule, MatIconModule,
        MatToolbarModule, MatSidenavModule,

        RouterModule,
        ServerStatusModule, FlexLayoutModule
    ],
  declarations: [SidenavComponent],
  exports: [SidenavComponent]
})
export class SidenavModule {}
