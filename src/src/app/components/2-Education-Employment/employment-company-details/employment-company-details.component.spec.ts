import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmploymentCompanyDetailsComponent } from './employment-company-details.component';

describe('EmploymentCompanyDetailsComponent', () => {
  let component: EmploymentCompanyDetailsComponent;
  let fixture: ComponentFixture<EmploymentCompanyDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmploymentCompanyDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmploymentCompanyDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
