import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KycVeificationOneComponent } from './kyc-veification-one.component';

describe('KycVeificationOneComponent', () => {
  let component: KycVeificationOneComponent;
  let fixture: ComponentFixture<KycVeificationOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KycVeificationOneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KycVeificationOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
