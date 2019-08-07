import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { IPyServerStatus, IServerStatus } from './server-status.interfaces';


@Injectable()
export class ServerStatusService {
  constructor(private http: HttpClient) { }

  get(): Observable<IServerStatus> {
    return this.http.get<IServerStatus>('/api');
  }

  getPy(): Observable<IPyServerStatus> {
    return this.http.get<IPyServerStatus>('/api/py');
  }
}
