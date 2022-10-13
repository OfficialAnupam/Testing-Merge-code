import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountAgreegatorPageComponent } from './account-agreegator-page.component';

describe('AccountAgreegatorPageComponent', () => {
  let component: AccountAgreegatorPageComponent;
  let fixture: ComponentFixture<AccountAgreegatorPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountAgreegatorPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountAgreegatorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
