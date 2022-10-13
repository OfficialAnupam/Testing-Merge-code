import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnicalErrorPageComponent } from './technical-error-page.component';

describe('TechnicalErrorPageComponent', () => {
  let component: TechnicalErrorPageComponent;
  let fixture: ComponentFixture<TechnicalErrorPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TechnicalErrorPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TechnicalErrorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
