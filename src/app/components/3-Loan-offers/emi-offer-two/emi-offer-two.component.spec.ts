import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmiOfferTwoComponent } from './emi-offer-two.component';

describe('EmiOfferTwoComponent', () => {
  let component: EmiOfferTwoComponent;
  let fixture: ComponentFixture<EmiOfferTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmiOfferTwoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmiOfferTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
