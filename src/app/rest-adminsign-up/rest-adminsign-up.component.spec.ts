import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestAdminsignUpComponent } from './rest-adminsign-up.component';

describe('RestAdminsignUpComponent', () => {
  let component: RestAdminsignUpComponent;
  let fixture: ComponentFixture<RestAdminsignUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestAdminsignUpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestAdminsignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
