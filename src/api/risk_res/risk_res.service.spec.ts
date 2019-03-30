/* tslint:disable:no-unused-variable */

import { inject, TestBed } from '@angular/core/testing';

import { RiskResService } from './risk_res.service';

describe('RiskResService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RiskResService]
    });
  });

  it('should ...', inject([RiskResService], (service: RiskResService) => {
    expect(service).toBeTruthy();
  }));
});
