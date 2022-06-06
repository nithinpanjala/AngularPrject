import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantAdminPageComponent } from './restaurant-admin-page.component';

describe('RestaurantAdminPageComponent', () => {
  let component: RestaurantAdminPageComponent;
  let fixture: ComponentFixture<RestaurantAdminPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestaurantAdminPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantAdminPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
