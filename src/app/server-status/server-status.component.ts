import { Component, Input, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { forkJoin } from 'rxjs';

import { ServerStatusService } from '../../api/server-status/server-status.service';
import { IPyServerStatus, IServerStatus } from '../../api/server-status/server-status.interfaces';
import { AlertsService } from '../alerts/alerts.service';


@Component({
  selector: 'app-server-status',
  templateUrl: './server-status.component.html',
  styleUrls: ['./server-status.component.css']
})
export class ServerStatusComponent implements OnInit {
  @Input() serverStatus: IServerStatus = {} as IServerStatus;
  pyServerStatus: IPyServerStatus = {} as IPyServerStatus;

  constructor(private serverStatusService: ServerStatusService,
              private alertsService: AlertsService) {}

  ngOnInit(): void {
    this.serverStatus = { version: '@ 0.0.27; ' };
    forkJoin([
      this.serverStatusService
        .get(),
      this.serverStatusService
        .getPy()
    ])
      .subscribe((apiVersions: [IServerStatus, IPyServerStatus]) => {
          this.serverStatus.version += `js ${apiVersions[0].version}`;
          this.pyServerStatus = apiVersions[1];
        },
        (error: HttpErrorResponse) => {
          const msg = error.status === 504 ? 'API server not available' : error.statusText;
          this.alertsService.add(msg);
          this.serverStatus.version += msg;
        }
      );
  }
}
