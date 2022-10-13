import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetailerDobPageSixComponent } from './retailer-dob-page-six.component';

describe('RetailerDobPageSixComponent', () => {
  let component: RetailerDobPageSixComponent;
  let fixture: ComponentFixture<RetailerDobPageSixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetailerDobPageSixComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RetailerDobPageSixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
