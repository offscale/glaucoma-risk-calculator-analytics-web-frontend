export interface IPyAnalytics2Response {
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
  counts: {
    gender: IGender;
    age_mag: IAgeMag;
    client_risk_mag: IMag;
    behaviour_change: IBehaviourChange;
    ethnicity: IEthnicity;
  };
  _out: string;
}

export interface IAgeMag {
  '000–025': IPercentageValue;
  '025–050': IPercentageValue;
  '050–075': IPercentageValue;
  '075–100': IPercentageValue;
  Total: number;
}

export interface IPercentageValue {
  percentage: number;
  value: number;
}

export interface IBehaviourChange {
  as_recommended: IPercentageValue;
  no_change: IPercentageValue;
  less_likely: IPercentageValue;
  Total: number;
}

export interface IMag {
  lowest: IPercentageValue;
  low: IPercentageValue;
  high: IPercentageValue;
  med: IPercentageValue;
  Total: number;
}

export interface IEthnicity {
  Total: number;
  olmsted: IPercentageValue;
  nepal: IPercentageValue;
  aboriginal: IPercentageValue;
  singapore: IPercentageValue;
  bmes: IPercentageValue;
  japanese: IPercentageValue;
  korean: IPercentageValue;
  ghana: IPercentageValue;
  barbados: IPercentageValue;
  framingham: IPercentageValue;
  indian: IPercentageValue;
}

export interface IGender {
  male: IPercentageValue;
  female: IPercentageValue;
  Total: number;
}
