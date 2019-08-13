export interface IPyAnalyticsResponse {
  survey_count: number;
  step1_count: number;
  step2_count: number;
  step3_count: number;
  some_combination: number;
  all_steps: number;
  email_conversion: number;
  completed: number;
  emails: number;
  join_for_pred_unique_cols: {
    client_risk_mag: IMag;
    perceived_risk_mag: IMag;
    behaviour_change: IBehaviourChange;
  };
  _out: string;
}

export interface IMag {
  lowest: number;
  low: number;
  med: number;
  high: number;
}

export interface IBehaviourChange {
  as_recommended: number;
  less_likely: number;
  no_change: number;
}
