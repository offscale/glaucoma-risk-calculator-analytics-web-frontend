/* tslint:disable:no-unused-variable */

import { inject, TestBed } from '@angular/core/testing';

import { PyAnalyticsService } from './py-analytics.service';

describe('PyAnalyticsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PyAnalyticsService]
    });
  });

  it('should ...', inject([PyAnalyticsService], (service: PyAnalyticsService) => {
    expect(service).toBeTruthy();
  }));
});
