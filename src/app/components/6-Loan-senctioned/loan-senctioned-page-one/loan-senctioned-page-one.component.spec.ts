import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanSenctionedPageOneComponent } from './loan-senctioned-page-one.component';

describe('LoanSenctionedPageOneComponent', () => {
  let component: LoanSenctionedPageOneComponent;
  let fixture: ComponentFixture<LoanSenctionedPageOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoanSenctionedPageOneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanSenctionedPageOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
