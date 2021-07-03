import { Routes } from '@angular/router';
import { PremiumCalculationComponent } from './components/premiumCalculation.component';

export const PremiumCalculationRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'premium',
        component: PremiumCalculationComponent,
      },
    ]
  }
];



