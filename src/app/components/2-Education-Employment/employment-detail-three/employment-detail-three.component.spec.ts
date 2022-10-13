import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmploymentDetailThreeComponent } from './employment-detail-three.component';

describe('EmploymentDetailThreeComponent', () => {
  let component: EmploymentDetailThreeComponent;
  let fixture: ComponentFixture<EmploymentDetailThreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmploymentDetailThreeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmploymentDetailThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
