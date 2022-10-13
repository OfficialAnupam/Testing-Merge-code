import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LdsSectionComponent } from './lds-section.component';

describe('LdsSectionComponent', () => {
  let component: LdsSectionComponent;
  let fixture: ComponentFixture<LdsSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LdsSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LdsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
