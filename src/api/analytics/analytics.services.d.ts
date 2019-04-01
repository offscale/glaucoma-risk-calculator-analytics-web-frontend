import { TRiskResRow, TSingleSeries } from '../risk_res/risk_res.services.d';

export interface IAnalyticsResponse {
  risk_res: TRiskResRow[];
  ethnicity_agg: TSingleSeries;
  step_2: {
    average: number;
    count: number;
    greatest: number;
    high: number;
    least: number;
  };
}
