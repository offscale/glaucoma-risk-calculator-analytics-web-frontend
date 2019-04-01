import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { IAnalyticsResponse } from './analytics.services.d';


@Injectable()
export class AnalyticsService {
  public analytics: IAnalyticsResponse;

  constructor(private http: HttpClient) {
  }

  read(id: number | 'latest'): Observable<IAnalyticsResponse> {
    return this.http.get<IAnalyticsResponse>(`/api/analytics/${id}`);
  }

  readAll(): Observable<IAnalyticsResponse> {
    return this.http.get<IAnalyticsResponse>('/api/analytics');
  }
}
