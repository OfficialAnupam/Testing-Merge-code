import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetailerMobilePageTwoComponent } from './retailer-mobile-page-two.component';

describe('RetailerMobilePageTwoComponent', () => {
  let component: RetailerMobilePageTwoComponent;
  let fixture: ComponentFixture<RetailerMobilePageTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetailerMobilePageTwoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RetailerMobilePageTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
