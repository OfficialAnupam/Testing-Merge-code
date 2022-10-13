import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetailerPinPageSevenComponent } from './retailer-pin-page-seven.component';

describe('RetailerPinPageSevenComponent', () => {
  let component: RetailerPinPageSevenComponent;
  let fixture: ComponentFixture<RetailerPinPageSevenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetailerPinPageSevenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RetailerPinPageSevenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
