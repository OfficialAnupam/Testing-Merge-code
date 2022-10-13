import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationDetailOneComponent } from './education-detail-one.component';

describe('EducationDetailOneComponent', () => {
  let component: EducationDetailOneComponent;
  let fixture: ComponentFixture<EducationDetailOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EducationDetailOneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EducationDetailOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
