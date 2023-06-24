import { TestBed } from '@angular/core/testing';

import { TongueService } from './tongue.service';

describe('TongueService', () => {
  let service: TongueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TongueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
