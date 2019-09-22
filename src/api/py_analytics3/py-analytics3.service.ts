import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';

import { IPyAnalytics3Response } from './analytics.services.d';
import { map } from 'rxjs/operators';


@Injectable()
export class PyAnalytics3Service {
  public analytics: IPyAnalytics3Response;

  constructor(private http: HttpClient) {
  }


  read(params: HttpParams): Observable<IPyAnalytics3Response> {
    return this.http.get<IPyAnalytics3Response>('/api/py/analytics3', { params })
      .pipe(map(res => {
        res.feature_importance_gv = atob(res.feature_importance_gv)
          .replace('height="345.6pt"', 'height="100%"')
          .replace('width="460.8pt"', 'width="100%"');
        return res;
      }));
  }
}
