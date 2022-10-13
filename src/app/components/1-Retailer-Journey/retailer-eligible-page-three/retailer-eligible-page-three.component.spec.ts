import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetailerEligiblePageThreeComponent } from './retailer-eligible-page-three.component';

describe('RetailerEligiblePageThreeComponent', () => {
  let component: RetailerEligiblePageThreeComponent;
  let fixture: ComponentFixture<RetailerEligiblePageThreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetailerEligiblePageThreeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RetailerEligiblePageThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
