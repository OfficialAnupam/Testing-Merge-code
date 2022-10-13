import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetailerEmailPageFourComponent } from './retailer-email-page-four.component';

describe('RetailerEmailPageFourComponent', () => {
  let component: RetailerEmailPageFourComponent;
  let fixture: ComponentFixture<RetailerEmailPageFourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetailerEmailPageFourComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RetailerEmailPageFourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
