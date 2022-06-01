import { TestBed } from '@angular/core/testing';

import { RestaurantOperationsService } from './restaurant-operations.service';

describe('RestaurantOperationsService', () => {
  let service: RestaurantOperationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestaurantOperationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
