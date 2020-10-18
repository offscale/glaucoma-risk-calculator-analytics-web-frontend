import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse, HttpParams } from '@angular/common/http';

import { MediaChange, MediaObserver } from '@angular/flex-layout';


import { forkJoin, Subscription } from 'rxjs';

import * as math from 'mathjs';

import * as moment from 'moment-timezone';
import { Moment } from 'moment';

import { IMultiSeries, ISingleSeries, TRiskResRow } from '../../api/risk_res/risk_res.services.d';
import { IAnalyticsResponse, ISurvey } from '../../api/analytics/analytics-types';
import { AnalyticsService } from '../../api/analytics/analytics.service';
import { PyAnalytics2Service } from '../../api/py_analytics2/py-analytics2.service';
import { IBehaviourChange, IMag, IPyAnalytics2Response } from '../../api/py_analytics2/analytics.services';
import { PyAnalytics3Service } from '../../api/py_analytics3/py-analytics3.service';
import { IPyAnalytics3Response } from '../../api/py_analytics3/analytics.services';
import { lowerCamel2under } from '../utils';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css'],
})
export class AnalyticsComponent implements OnInit, OnDestroy {
  riskResTable: MatTableDataSource<TRiskResRow> = null;
  surveyTable: MatTableDataSource<ISurvey> = null;
  clientRiskMagTable: MatTableDataSource<IMag> = null;
  perceivedRiskMagTable: MatTableDataSource<IMag> = null;
  behaviourChangeTable: MatTableDataSource<IBehaviourChange> = null;
  ciTable: MatTableDataSource<IPyAnalytics2Response['counts']> = null;

  ageDistribution: Array<{name: string, series: ISingleSeries[]}>;
  ethnicityAgg: ISingleSeries[];
  view: [number, number] = [250, 250];
  step2: IAnalyticsResponse['step_2'];
  rowWiseColumns: string[];
  step2multiSeries: IMultiSeries;

  @ViewChild('featureImportanceGvSvg', { static: false })
  featureImportanceGvSvg: ElementRef;

  notFoundDateRange = false;

  public selectedMoments: Moment[] = [
    moment('2019-03-11T08:00:00+11:00').tz('Australia/Sydney'),
    moment('2019-03-11T15:00:00+11:00').tz('Australia/Sydney')
  ];

  @ViewChild(MatPaginator, { static: true })
  paginator: MatPaginator;

  watcher: Subscription;
  activeMediaQuery = '';

  pyAnalytics2Data: IPyAnalytics2Response;
  pyAnalytics3Data: IPyAnalytics3Response;
  rowWiseStats: IAnalyticsResponse['row_wise_stats'];
  behaviourChangeColumns: string[] = [];

  @ViewChild('feature_importance_gv', { static: false }) featureImportanceElement: ElementRef;

  constructor(mediaObserver: MediaObserver,
              private router: Router,
              private route: ActivatedRoute,
              private snackBar: MatSnackBar,
              private analyticsService: AnalyticsService,
              private pyAnalytics2Service: PyAnalytics2Service,
              private pyAnalytics3Service: PyAnalytics3Service) {
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

  ngOnDestroy(): void {
    this.watcher.unsubscribe();
  }

  ngOnInit(): void {
    this.route
      .queryParamMap
      .subscribe(params => {
        if (params.has('startDatetime'))
          this.selectedMoments[0] = moment(params.get('startDatetime')).tz('Australia/Sydney');
        if (params.has('endDatetime'))
          this.selectedMoments[1] = moment(params.get('endDatetime')).tz('Australia/Sydney');

        const dt = new HttpParams()
          .set('startDatetime', encodeURIComponent(this.selectedMoments[0].toISOString(true)))
          .set('endDatetime', encodeURIComponent(this.selectedMoments[1].toISOString(true)));

        forkJoin([
          this.analyticsService.readAll0(dt),
          this.analyticsService.readAll1(dt),
          this.pyAnalytics2Service.read(dt),
          this.pyAnalytics3Service.read(dt)
        ])
          .subscribe((nodeNodePythonPython) => {
            const node0 = nodeNodePythonPython[0];
            this.riskResTable = new MatTableDataSource<TRiskResRow>(node0.row_wise_stats.risk_res);
            this.riskResTable.paginator = this.paginator;

            this.surveyTable = new MatTableDataSource<ISurvey>(node0.survey_tbl);
            this.riskResTable.paginator = this.paginator;

            this.ethnicityAgg = node0.ethnicity_agg;
            this.step2 = node0.step_2;
            this.rowWiseStats = node0.row_wise_stats;
            this.rowWiseColumns = Object.keys(node0.row_wise_stats.column.age);
            this.graphInit();
            /*
            if (this.date_range_component != null)
              this.date_range_component.confirmSelectedChange
                .subscribe(n => this.toDateRange());
             */

            const node1 = nodeNodePythonPython[1];
            this.step2multiSeries = node1.step_2_multi_series;

            const python2 = nodeNodePythonPython[2];
            if (Array.isArray(python2._out))
              python2._out.forEach(v => console.info(v));
            else
              console.info(python2._out);

            this.pyAnalytics2Data = ((): IPyAnalytics2Response => {
              python2.completed = parseFloat(math.multiply(python2.completed, 100).toPrecision(5));
              return python2;
            })();

            Object
              .keys(this.pyAnalytics2Data.join_for_pred_unique_cols)
              .filter(k => k !== 'behaviour_change')
              .forEach(k => {
                this[lowerCamel2under(k)] = new MatTableDataSource<IMag>([
                  this.pyAnalytics2Data.join_for_pred_unique_cols[k]
                ]);
              });

            this.clientRiskMagTable = new MatTableDataSource<IMag>([
              this.pyAnalytics2Data.join_for_pred_unique_cols.client_risk_mag
            ]);

            this.perceivedRiskMagTable = new MatTableDataSource<IMag>([
              this.pyAnalytics2Data.join_for_pred_unique_cols.perceived_risk_mag
            ]);

            this.behaviourChangeColumns = Object.keys(this.pyAnalytics2Data.join_for_pred_unique_cols.behaviour_change).sort();
            this.behaviourChangeTable = new MatTableDataSource<IBehaviourChange>([
              this.pyAnalytics2Data.join_for_pred_unique_cols.behaviour_change
            ]);

            this.ciTable = new MatTableDataSource<IPyAnalytics2Response['counts']>([this.pyAnalytics2Data.counts]);

            const python3 = nodeNodePythonPython[3];
            if (Array.isArray(python3._out))
              python3._out.forEach(v => console.info(v));
            else
              console.info(python3._out);

            this.pyAnalytics3Data = python3;
            // this.populate();
          }, (err: HttpErrorResponse) => {
            if (err.status === 404) {
              this.notFoundDateRange = true;
              this.snackBar
                .open('No data found', 'Choose different date range')
                .afterDismissed()
                .subscribe(() => /*this.date_range_component.confirmSelect()*/ void 0);
            } else console.error('AnalyticsComponent::ngOnInit::forkJoin::err', err, ';');
          });
      });
  }

  private graphInit(): void {
    const age2riskIds = new Map<number, number[]>();
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].forEach(
      k => age2riskIds.set(k, [])
    );
    const riskId2risk = new Map<number, TRiskResRow>();
    this.riskResTable.data.forEach(riskRes => {
      riskId2risk.set(riskRes.id, riskRes);
      const k = Math.floor(riskRes.age / 10);
      age2riskIds.set(k, age2riskIds.get(k).concat(riskRes.id));
    });
    this.ageDistribution = Array
      .from(age2riskIds.values())
      .map((riskIds, idx) => ({
        name: (sr => `${sr}-${sr + 9}`)(idx * 10),
        series: riskIds.map(k => (riskRes => ({
          name: riskRes.id.toString(),
          value: riskRes.age
        }))(riskId2risk.get(k)))
      }))
      .filter(o => o.series.length);
  }

  toDateRange(): void {
    this.router.navigate([],
      {
        relativeTo: this.route,
        queryParams: {
          from: this.selectedMoments[0].toISOString(true),
          to: this.selectedMoments[1].toISOString(true)
        },
        queryParamsHandling: 'merge',
        replaceUrl: true
      })
      .catch(console.error);
  }
}
