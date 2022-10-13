import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmploymentDetailTwoComponent } from './employment-detail-two.component';

describe('EmploymentDetailTwoComponent', () => {
  let component: EmploymentDetailTwoComponent;
  let fixture: ComponentFixture<EmploymentDetailTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmploymentDetailTwoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmploymentDetailTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
