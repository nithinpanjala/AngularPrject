import { TestBed } from '@angular/core/testing';

import { CustomerSignUpServiceService } from './customer-sign-up-service.service';

describe('CustomerSignUpServiceService', () => {
  let service: CustomerSignUpServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerSignUpServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
