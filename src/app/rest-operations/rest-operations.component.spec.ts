import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestOperationsComponent } from './rest-operations.component';

describe('RestOperationsComponent', () => {
  let component: RestOperationsComponent;
  let fixture: ComponentFixture<RestOperationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestOperationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestOperationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
