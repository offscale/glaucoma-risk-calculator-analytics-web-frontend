import { AfterContentInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { FormGroup } from '@angular/forms';

import { MediaChange, MediaObserver } from '@angular/flex-layout';

import { MatPaginator, MatSnackBar, MatTableDataSource } from '@angular/material';

import { forkJoin, Subscription } from 'rxjs';

import * as math from 'mathjs';

import * as moment from 'moment-timezone';
import { Moment } from 'moment';

import { IMultiSeries, ISingleSeries, TRiskResRow } from '../../api/risk_res/risk_res.services.d';
import { IAnalyticsResponse, ISurvey } from '../../api/analytics/analytics-types';
import { AnalyticsService } from '../../api/analytics/analytics.service';
import { PyAnalyticsService } from '../../api/py_analytics/py-analytics.service';
import { IBehaviourChange, IMag, IPyAnalyticsResponse } from '../../api/py_analytics/analytics.services';
import { lowerCamel2under } from '../utils';


@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css'],
})
export class AnalyticsComponent implements OnInit, AfterContentInit, OnDestroy {
  riskResTable: MatTableDataSource<TRiskResRow> = null;
  surveyTable: MatTableDataSource<ISurvey> = null;
  clientRiskMagTable: MatTableDataSource<IMag> = null;
  perceivedRiskMagTable: MatTableDataSource<IMag> = null;
  behaviourChangeTable: MatTableDataSource<IBehaviourChange> = null;
  ciTable: MatTableDataSource<IPyAnalyticsResponse['counts']> = null;

  ageDistribution: Array<{name: string, series: ISingleSeries[]}>;
  ethnicityAgg: ISingleSeries[];
  view: [number, number] = [250, 250];
  step2: IAnalyticsResponse['step_2'];
  rowWiseColumns: string[];
  step2multiSeries: IMultiSeries;

  notFoundDateRange = false;

  public selectedMoments: Moment[] = [
    moment('2019-03-11T08:00:00+11:00').tz('Australia/Sydney'),
    moment('2019-03-11T15:00:00+11:00').tz('Australia/Sydney')
  ];

  @ViewChild(MatPaginator, { static: true })
  paginator: MatPaginator;

  watcher: Subscription;
  activeMediaQuery = '';
  group: FormGroup;
  pyAnalyticsData: IPyAnalyticsResponse;
  rowWiseStats: IAnalyticsResponse['row_wise_stats'];
  behaviourChangeColumns: string[] = [];

  constructor(mediaObserver: MediaObserver,
              private router: Router,
              private route: ActivatedRoute,
              private snackBar: MatSnackBar,
              private analyticsService: AnalyticsService,
              private pyAnalyticsService: PyAnalyticsService) {
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
          this.analyticsService
            .readAll0(dt),
          this.analyticsService
            .readAll1(dt),
          this.pyAnalyticsService
            .read(dt)
        ])
          .subscribe((nodeNodePython) => {
            const node0 = nodeNodePython[0];
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

            const node1 = nodeNodePython[1];
            this.step2multiSeries = node1.step_2_multi_series;

            const python = nodeNodePython[2];
            if (Array.isArray(python._out))
              python._out.forEach(v => console.info(v));
            else
              console.info(python._out);

            this.pyAnalyticsData = ((): IPyAnalyticsResponse => {
              python.completed = parseFloat(math.multiply(python.completed, 100).toPrecision(5));
              return python;
            })();

            Object
              .keys(this.pyAnalyticsData.join_for_pred_unique_cols)
              .filter(k => k !== 'behaviour_change')
              .forEach(k => {
                console.info(`lowerCamel2under(${k}):`, lowerCamel2under(k), ';');
                this[lowerCamel2under(k)] = new MatTableDataSource<IMag>([
                  this.pyAnalyticsData.join_for_pred_unique_cols[k]
                ]);
              });

            this.clientRiskMagTable = new MatTableDataSource<IMag>([
              this.pyAnalyticsData.join_for_pred_unique_cols.client_risk_mag
            ]);

            this.perceivedRiskMagTable = new MatTableDataSource<IMag>([
              this.pyAnalyticsData.join_for_pred_unique_cols.perceived_risk_mag
            ]);

            this.behaviourChangeColumns = Object.keys(this.pyAnalyticsData.join_for_pred_unique_cols.behaviour_change).sort();
            this.behaviourChangeTable = new MatTableDataSource<IBehaviourChange>([
              this.pyAnalyticsData.join_for_pred_unique_cols.behaviour_change
            ]);

            this.ciTable = new MatTableDataSource<IPyAnalyticsResponse['counts']>([this.pyAnalyticsData.counts]);
          }, (err: HttpErrorResponse) => {
            if (err.status === 404) {
              this.notFoundDateRange = true;
              this.snackBar
                .open('No data found', 'Choose different date range')
                .afterDismissed()
                .subscribe(() => /*this.date_range_component.confirmSelect()*/ void 0);
            } else console.error('AnalyticsComponent::ngOnInit::analyticsService.readAll0(_)::err', err, ';');
          });
      });
  }

  ngAfterContentInit() {
    // this.date_range_component.open();
  }

  private graphInit() {
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

  toDateRange() {
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
