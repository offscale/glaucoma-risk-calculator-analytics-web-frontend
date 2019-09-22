/* tslint:disable:no-unused-variable */

import { inject, TestBed } from '@angular/core/testing';

import { PyAnalytics3Service } from './py-analytics3.service';

describe('PyAnalytics3Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PyAnalytics3Service]
    });
  });

  it('should ...', inject([PyAnalytics3Service], (service: PyAnalytics3Service) => {
    expect(service).toBeTruthy();
  }));
});
