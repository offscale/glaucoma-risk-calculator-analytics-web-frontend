/// <reference path='../../../typings/modules/glaucoma-risk-quiz-engine/index.d.ts' />

import { IInput, IMultiplicativeRisks } from 'glaucoma-risk-quiz-engine';

export type TRiskResOut = Partial<IMultiplicativeRisks & IInput> & {client_risk: number, ethnicity: string}
  & {id: number, createdAt: string, updatedAt: string};

export interface IEthnicityAgg {
  ethnicity: string;
  count: number;
}

export interface ISingleSeries {
  name: string;
  value: number;
}
