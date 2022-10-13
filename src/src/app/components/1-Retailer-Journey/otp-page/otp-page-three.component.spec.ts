import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtpPageThreeComponent } from './otp-page-three.component';

describe('OtpPageThreeComponent', () => {
  let component: OtpPageThreeComponent;
  let fixture: ComponentFixture<OtpPageThreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtpPageThreeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OtpPageThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
