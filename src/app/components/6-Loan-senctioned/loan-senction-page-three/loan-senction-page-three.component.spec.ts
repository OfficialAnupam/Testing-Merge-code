import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanSenctionPageThreeComponent } from './loan-senction-page-three.component';

describe('LoanSenctionPageThreeComponent', () => {
  let component: LoanSenctionPageThreeComponent;
  let fixture: ComponentFixture<LoanSenctionPageThreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoanSenctionPageThreeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanSenctionPageThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
