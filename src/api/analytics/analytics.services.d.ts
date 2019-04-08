import { TRiskResRow, TSingleSeries } from '../risk_res/risk_res.services.d';

export interface IRowWise {
  geometricMean: number;
  harmonicMean: number;
  interquartileRange: number;
  max: number;
  mean: number;
  median: number;
  medianAbsoluteDeviation: number;
  min: number;
  mode: number;
  rootMeanSquare: number;
  sampleSkewness: number;
  sampleStandardDeviation: number;
  sampleVariance: number;
  standardDeviation: number;
  sum: number;
  variance: number;
}

export interface IAnalyticsResponse {
  row_wise_stats: {
    risk_res: TRiskResRow[]
    column: {
      age: IRowWise;
      client_risk: IRowWise;
    }
  };
  ethnicity_agg: TSingleSeries;
  step_2: {
    average: number;
    count: number;
    greatest: number;
    high: number;
    least: number;
  };
}
