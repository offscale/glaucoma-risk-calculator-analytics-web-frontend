import { AfterContentInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { MediaChange, MediaObserver } from '@angular/flex-layout';

import { MatPaginator, MatSnackBar, MatTableDataSource } from '@angular/material';

import { Subscription } from 'rxjs';

import { ISingleSeries, TRiskResRow } from '../../api/risk_res/risk_res.services.d';
import { IAnalyticsResponse, IRowWise, ISurvey } from '../../api/analytics/analytics.services.d';
import { AnalyticsService } from '../../api/analytics/analytics.service';

import * as moment from 'moment-timezone';
import { DateTimeAdapter, OWL_DATE_TIME_FORMATS, OWL_DATE_TIME_LOCALE, OwlDateTimeComponent } from 'ng-pick-datetime';
import { MomentDateTimeAdapter } from 'ng-pick-datetime/date-time/adapter/moment-adapter/moment-date-time-adapter.class';
import { OWL_MOMENT_DATE_TIME_FORMATS } from 'ng-pick-datetime/date-time/adapter/moment-adapter/moment-date-time-format.class';
import { ActivatedRoute, Router } from '@angular/router';
import { Moment } from 'moment';
import { HttpErrorResponse, HttpParams } from '@angular/common/http';

moment().tz('Australia/Sydney').format();

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css'],
  /*providers: [
    // `MomentDateAdapter` and `MAT_MOMENT_DATE_FORMATS` can be automatically provided by importing
    // `MatMomentDateModule` in your applications root module. We provide it at the component level
    // here, due to limitations of our example generation script.
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  ]*/

  providers: [
    // `MomentDateTimeAdapter` and `OWL_MOMENT_DATE_TIME_FORMATS` can be automatically provided by importing
    // `OwlMomentDateTimeModule` in your applications root module. We provide it at the component level
    // here, due to limitations of our example generation script.
    { provide: DateTimeAdapter, useClass: MomentDateTimeAdapter, deps: [OWL_DATE_TIME_LOCALE] },
    { provide: OWL_DATE_TIME_FORMATS, useValue: OWL_MOMENT_DATE_TIME_FORMATS },
  ]
})
export class AnalyticsComponent implements OnInit, AfterContentInit, OnDestroy {
  risk_res_table: MatTableDataSource<TRiskResRow> = null;
  survey_table: MatTableDataSource<ISurvey> = null;

  age_distr: Array<{name: string, series: ISingleSeries[]}>;
  ethnicity_agg: ISingleSeries[];
  view: [number, number] = [250, 250];
  step_2: IAnalyticsResponse['step_2'];
  row_wise_age: IRowWise;
  row_wise_client_risk: IRowWise;
  row_wise_columns: string[];

  @ViewChild('date_range_component')
  date_range_component: OwlDateTimeComponent<AnalyticsComponent>;

  public selectedMoments: Moment[] = [
    moment('2019-03-11T08:00:00+11:00').tz('Australia/Sydney'),
    moment('2019-03-11T15:00:00+11:00').tz('Australia/Sydney')
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  watcher: Subscription;
  activeMediaQuery = '';

  constructor(mediaObserver: MediaObserver,
              private router: Router,
              private route: ActivatedRoute,
              private snackBar: MatSnackBar,
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
    this.route
      .queryParamMap
      .subscribe(params => {
        if (params.has('startDatetime'))
          this.selectedMoments[0] = moment(params.get('startDatetime')).tz('Australia/Sydney');
        if (params.has('endDatetime'))
          this.selectedMoments[1] = moment(params.get('endDatetime')).tz('Australia/Sydney');

        this.analyticsService
          .readAll(new HttpParams()
            .set('startDatetime', encodeURIComponent(this.selectedMoments[0].toISOString(true)))
            .set('endDatetime', encodeURIComponent(this.selectedMoments[1].toISOString(true)))
          )
          .subscribe(analytics => {
            this.risk_res_table = new MatTableDataSource<TRiskResRow>(analytics.row_wise_stats.risk_res);
            this.risk_res_table.paginator = this.paginator;

            this.survey_table = new MatTableDataSource<ISurvey>(analytics.survey_tbl);
            this.risk_res_table.paginator = this.paginator;

            this.ethnicity_agg = analytics.ethnicity_agg;
            this.step_2 = analytics.step_2;
            this.row_wise_age = analytics.row_wise_stats.column.age;
            this.row_wise_client_risk = analytics.row_wise_stats.column.client_risk;
            this.row_wise_columns = Object.keys(analytics.row_wise_stats.column.age);
            this.graphInit();
            this.date_range_component.confirmSelectedChange.subscribe(
              n => this.toDateRange()
            );
          }, (err: HttpErrorResponse) => {
            if (err.status === 404)
              this.snackBar
                .open('No data found', 'Choose different date range')
                .afterDismissed()
                .subscribe(() => this.date_range_component.confirmSelect() );
            else console.error('AnalyticsComponent::ngOnInit::analyticsService.readAll(_)::err', err, ';');
          });
      });
  }

  ngAfterContentInit() {
    // this.date_range_component.open();
  }

  private graphInit() {
    const age_to_riskids = new Map<number, number[]>();
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].forEach(
      k => age_to_riskids.set(k, [])
    );
    const riskid_to_risk = new Map<number, TRiskResRow>();
    this.risk_res_table.data.forEach(risk_res => {
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

  toDateRange() {
    this.router.navigate([],
      {
        relativeTo: this.route,
        queryParams: {
          startDatetime: this.selectedMoments[0].toISOString(true),
          endDatetime: this.selectedMoments[1].toISOString(true)
        },
        queryParamsHandling: 'merge',
        replaceUrl: true
      });
  }
}
