import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DefaultLayoutComponent} from './layout/default-layout.component'


export const AppRoutes: Routes = [
  {
    path: '',
    redirectTo: 'premium',
    pathMatch: 'full',
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    //resolve: { guestToken: TokenResolver },
    children: [
      {
       path: '',
       loadChildren: './premiumCalculation/premiumCalculation.module#PremiumCalculationModule'
      },
    ],
    runGuardsAndResolvers: 'always'
  },
  { path: '**', redirectTo: '404' },

];



