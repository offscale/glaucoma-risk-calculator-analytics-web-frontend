// tslint:disable-next-line:no-reference
/// <reference path='../../../typings/modules/glaucoma-risk-quiz-engine/index.d.ts' />

import { IInput, IMultiplicativeRisks } from 'glaucoma-risk-quiz-engine';

export type TRiskResRow = Partial<IMultiplicativeRisks & IInput> & {client_risk: number, ethnicity: string}
  & {id: number, createdAt: string, updatedAt: string};

export interface IEthnicityAgg {
  ethnicity: string;
  count: number;
}

export interface ISingleSeries {
  name: string;
  value: number;
}

export type TSingleSeries = Array<{name: string, value: number}>;

interface IMultiSeries {
  name: string;
  series: ISingleSeries[];
}
