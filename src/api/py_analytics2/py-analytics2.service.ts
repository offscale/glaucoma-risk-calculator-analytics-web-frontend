import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';

import { IPyAnalytics2Response } from './analytics.services.d';


@Injectable()
export class PyAnalytics2Service {
  public analytics: IPyAnalytics2Response;

  constructor(private http: HttpClient) {
  }


  read(params: HttpParams): Observable<IPyAnalytics2Response> {
    return this.http.get<IPyAnalytics2Response>('/api/py/analytics2', { params });
  }
}
