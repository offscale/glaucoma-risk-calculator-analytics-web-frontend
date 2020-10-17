import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FlexLayoutModule } from '@angular/flex-layout';

import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';

import { AuthGuard } from './auth/auth.guard';
import { AuthInterceptor } from './auth/auth.interceptors';
import { SidenavModule } from './sidenav/sidenav.module';
import { AlertsModule } from './alerts/alerts.module';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';


@NgModule({
  declarations: [
    AppComponent
  ],
    imports: [
        BrowserModule,
        HttpClientModule,
        LayoutModule,
        BrowserAnimationsModule,
        RouterModule,
        RouterModule.forRoot(appRoutes),

        MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule,
        MatGridListModule,
        MatCardModule,
        MatMenuModule,

        AlertsModule.forRoot(),
        SidenavModule,
        FlexLayoutModule
    ],
  providers: [
    AuthGuard, {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
