import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferPageOneComponent } from './offer-page-one.component';

describe('OfferPageOneComponent', () => {
  let component: OfferPageOneComponent;
  let fixture: ComponentFixture<OfferPageOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfferPageOneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferPageOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
