import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanSenctionPageTwoComponent } from './loan-senction-page-two.component';

describe('LoanSenctionPageTwoComponent', () => {
  let component: LoanSenctionPageTwoComponent;
  let fixture: ComponentFixture<LoanSenctionPageTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoanSenctionPageTwoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanSenctionPageTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
