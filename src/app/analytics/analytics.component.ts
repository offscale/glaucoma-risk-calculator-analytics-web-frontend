import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { MediaChange, MediaObserver } from '@angular/flex-layout';

import { MatPaginator, MatTableDataSource } from '@angular/material';

import { Subscription } from 'rxjs';

import { ISingleSeries, TRiskResRow } from '../../api/risk_res/risk_res.services.d';
import { IAnalyticsResponse } from '../../api/analytics/analytics.services.d';
import { AnalyticsService } from '../../api/analytics/analytics.service';


@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements OnInit, OnDestroy {
  dataSource: MatTableDataSource<TRiskResRow> = null;
  age_distr: Array<{name: string, series: Array<{name: string, value: number}>}>;
  ethnicity_agg: ISingleSeries[];
  view: [number, number] = [250, 250];
  step_2: IAnalyticsResponse['step_2'];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  watcher: Subscription;
  activeMediaQuery = '';

  constructor(mediaObserver: MediaObserver,
              private analyticsService: AnalyticsService) {
    this.watcher = mediaObserver
      .asObservable()
      .subscribe((changes: MediaChange[]) => {
        const change: MediaChange = changes[changes.length - 1];
        this.activeMediaQuery = change ? `'${change.mqAlias}' = (${change.mediaQuery})` : '';
        switch (change.mqAlias) {
          case 'gt-sm':
            this.view = [500, 500];
            break;
          case 'xs':
          case 'lt-sm':
          default:
            this.view = [250, 250];
          // console.info('change.mqAlias', change.mqAlias, ';');
        }
      });
  }

  ngOnDestroy() {
    this.watcher.unsubscribe();
  }

  ngOnInit() {
    this.analyticsService
      .readAll()
      .subscribe(analytics => {
        this.dataSource = new MatTableDataSource<TRiskResRow>(analytics.risk_res);
        this.dataSource.paginator = this.paginator;
        this.ethnicity_agg = analytics.ethnicity_agg;
        this.step_2 = analytics.step_2;
        this.graphInit();
      });
  }

  private graphInit() {
    const age_to_riskids = new Map<number, number[]>();
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].forEach(
      k => age_to_riskids.set(k, [])
    );
    const riskid_to_risk = new Map<number, TRiskResRow>();
    this.dataSource.data.forEach(risk_res => {
      riskid_to_risk.set(risk_res.id, risk_res);
      const k = Math.floor(risk_res.age / 10);
      age_to_riskids.set(k, age_to_riskids.get(k).concat(risk_res.id));
    });
    this.age_distr = Array
      .from(age_to_riskids.values())
      .map((risk_ids, idx) => ({
        name: (sr => `${sr}-${sr + 9}`)(idx * 10),
        series: risk_ids.map(k => (risk_res => ({
          name: risk_res.id.toString(),
          value: risk_res.age
        }))(riskid_to_risk.get(k)))
      }))
      .filter(o => o.series.length);
  }
}
