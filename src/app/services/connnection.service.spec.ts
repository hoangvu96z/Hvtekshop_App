import { TestBed } from '@angular/core/testing';

import { ConnnectionService } from './connnection.service';

describe('ConnnectionService', () => {
  let service: ConnnectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConnnectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
