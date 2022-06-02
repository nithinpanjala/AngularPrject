import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodMenuPageComponent } from './food-menu-page.component';

describe('FoodMenuPageComponent', () => {
  let component: FoodMenuPageComponent;
  let fixture: ComponentFixture<FoodMenuPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FoodMenuPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodMenuPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
