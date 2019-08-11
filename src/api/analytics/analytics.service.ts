import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';

import { IAnalyticsResponse } from './analytics-types';


@Injectable()
export class AnalyticsService {
  public analytics: IAnalyticsResponse;

  constructor(private http: HttpClient) {
  }

  read(id: number | 'latest'): Observable<IAnalyticsResponse> {
    return this.http.get<IAnalyticsResponse>(`/api/analytics/${id}`);
  }

  readAll0(params: HttpParams): Observable<IAnalyticsResponse> {
    return this.http.get<IAnalyticsResponse>('/api/analytics0', { params });
  }

  readAll1(params: HttpParams): Observable<IAnalyticsResponse> {
    return this.http.get<IAnalyticsResponse>('/api/analytics1', { params });
  }
}
