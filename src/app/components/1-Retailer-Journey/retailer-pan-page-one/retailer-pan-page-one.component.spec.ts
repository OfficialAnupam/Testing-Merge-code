import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetailerPanPageOneComponent } from './retailer-pan-page-one.component';

describe('RetailerPanPageOneComponent', () => {
  let component: RetailerPanPageOneComponent;
  let fixture: ComponentFixture<RetailerPanPageOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetailerPanPageOneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RetailerPanPageOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
