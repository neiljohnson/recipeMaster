import { TestBed } from '@angular/core/testing';

import { WhiskApiService } from './whisk-api.service';

describe('WhiskApiService', () => {
  let service: WhiskApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WhiskApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
