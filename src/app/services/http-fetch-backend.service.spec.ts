import { TestBed } from '@angular/core/testing';

import { HttpFetchBackendService } from './http-fetch-backend.service';

describe('HttpFetchBackendService', () => {
  let service: HttpFetchBackendService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpFetchBackendService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
