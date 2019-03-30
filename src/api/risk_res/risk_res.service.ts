import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IEthnicityAgg, TRiskResOut } from './risk_res.services';

export type TSingleSeries = Array<{name: string, value: number}>;

@Injectable()
export class RiskResService {
  public risk: TRiskResOut;

  constructor(private http: HttpClient) {
  }

  read(id: number | 'latest'): Observable<TRiskResOut> {
    return this.http.get<TRiskResOut>(`/api/risk_res/${id}`);
  }

  readAll(): Observable<{risk_res: TRiskResOut[], ethnicity_agg: TSingleSeries}> {
    return this.http.get<{risk_res: TRiskResOut[], ethnicity_agg: IEthnicityAgg[]}>('/api/risk_res')
      .pipe(map(r => ({
        ethnicity_agg: r.ethnicity_agg.map(
          el => ({ name: el.ethnicity, value: el.count })
        ) as TSingleSeries,
        risk_res: r.risk_res
      })));
  }
}
