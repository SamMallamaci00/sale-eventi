import { TestBed } from '@angular/core/testing';

import { PrenotaServiceService } from './prenota-service.service';

describe('PrenotaServiceService', () => {
  let service: PrenotaServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrenotaServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
