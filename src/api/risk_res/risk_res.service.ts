import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IEthnicityAgg, TRiskResRow, TSingleSeries } from './risk_res.services';

@Injectable()
export class RiskResService {
  public risk: TRiskResRow;

  constructor(private http: HttpClient) {
  }

  read(id: number | 'latest'): Observable<TRiskResRow> {
    return this.http.get<TRiskResRow>(`/api/risk_res/${id}`);
  }

  readAll(): Observable<{risk_res: TRiskResRow[], ethnicity_agg: TSingleSeries}> {
    return this.http.get<{risk_res: TRiskResRow[], ethnicity_agg: IEthnicityAgg[]}>('/api/risk_res')
      .pipe(map(r => ({
        ethnicity_agg: r.ethnicity_agg.map(
          el => ({ name: el.ethnicity, value: el.count })
        ) as TSingleSeries,
        risk_res: r.risk_res
      })));
  }
}
