import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmploymentDetailFourComponent } from './employment-detail-four.component';

describe('EmploymentDetailFourComponent', () => {
  let component: EmploymentDetailFourComponent;
  let fixture: ComponentFixture<EmploymentDetailFourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmploymentDetailFourComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmploymentDetailFourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
