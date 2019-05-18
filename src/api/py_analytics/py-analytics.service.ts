import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';

import { IPyAnalyticsResponse } from './analytics.services.d';


@Injectable()
export class PyAnalyticsService {
  public analytics: IPyAnalyticsResponse;

  constructor(private http: HttpClient) {
  }


  read(params: HttpParams): Observable<IPyAnalyticsResponse> {
    return this.http.get<IPyAnalyticsResponse>('/api/py/analytics', {params: params});
  }
}
