import { TestBed } from '@angular/core/testing';

import { SalaServiceService } from './sala-service.service';

describe('SalaServiceService', () => {
  let service: SalaServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SalaServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
