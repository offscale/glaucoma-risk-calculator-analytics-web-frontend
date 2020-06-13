import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CdkTableModule } from '@angular/cdk/table';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

import { UserService } from '../../api/user/user.service';
import { AlertsService } from '../alerts/alerts.service';
import { UserCrudDialogComponent } from './user-crud-dialog/user-crud.dialog.component';
import { UsersAdminComponent } from './users-admin/users-admin.component';
import { AdminComponent } from './admin.component';
import { adminRoutes } from './admin.routes';


@NgModule({
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule, RouterModule, RouterModule.forChild(adminRoutes),

    CdkTableModule,

    MatButtonModule, MatDialogModule, MatFormFieldModule, MatIconModule,
    MatInputModule, MatSelectModule, MatTableModule, MatToolbarModule
  ],
  declarations: [UserCrudDialogComponent, UsersAdminComponent, AdminComponent],
  providers: [AlertsService, UserService],
  entryComponents: [UserCrudDialogComponent]
})
export class AdminModule {}
