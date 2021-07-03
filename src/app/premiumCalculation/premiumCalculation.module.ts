import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PremiumCalculationComponent } from './components/premiumCalculation.component';
import { RouterModule } from '@angular/router';
import {PremiumCalculationRoutes} from './premiumCalculation.routing';
import { BaseService } from './services/baseservice';
import { FormsModule } from '@angular/forms'; 
import { DatepickerModule, BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@NgModule({
  declarations: [ PremiumCalculationComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(PremiumCalculationRoutes),
    BsDatepickerModule.forRoot(),
    DatepickerModule.forRoot(),
  ],
  providers: [
    BaseService]
})
export class PremiumCalculationModule { }
