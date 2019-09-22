/* tslint:disable:no-unused-variable */

import { inject, TestBed } from '@angular/core/testing';

import { PyAnalytics2Service } from './py-analytics2.service';

describe('PyAnalyticsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PyAnalytics2Service]
    });
  });

  it('should ...', inject([PyAnalytics2Service], (service: PyAnalytics2Service) => {
    expect(service).toBeTruthy();
  }));
});
