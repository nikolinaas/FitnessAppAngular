import { TestBed } from '@angular/core/testing';

import { IsLoggedinService } from './is-loggedin.service';

describe('IsLoggedinService', () => {
  let service: IsLoggedinService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IsLoggedinService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
