import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PremiumCalculationComponent } from './premiumCalculation.component';

describe('PremiumCalculationComponent', () => {
  let component: PremiumCalculationComponent;
  let fixture: ComponentFixture<PremiumCalculationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PremiumCalculationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PremiumCalculationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
