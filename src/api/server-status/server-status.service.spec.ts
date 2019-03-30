import { inject, TestBed } from '@angular/core/testing';

import { ServerStatusService } from './server-status.service';

describe('ServerStatusService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServerStatusService]
    });
  });

  it('should be created', inject([ServerStatusService], (service: ServerStatusService) => {
    expect(service).toBeTruthy();
  }));
});
