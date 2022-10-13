import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetailerGenderPageFiveComponent } from './retailer-gender-page-five.component';

describe('RetailerGenderPageFiveComponent', () => {
  let component: RetailerGenderPageFiveComponent;
  let fixture: ComponentFixture<RetailerGenderPageFiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetailerGenderPageFiveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RetailerGenderPageFiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
