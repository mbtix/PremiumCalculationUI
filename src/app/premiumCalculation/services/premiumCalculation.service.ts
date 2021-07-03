import { Injectable } from '@angular/core';

import { Http } from '@angular/http';
import { map } from 'rxjs/operators';
import { BaseService } from './baseservice';
import { Dictionary } from '../../common/dictionary';
import { PremiumModel } from '../model/common'

@Injectable()
export class PremiumCalculationService  {

  constructor(private httpService: BaseService) { }
  
  //call GET API to calculate Premium
  getCalculatedPremium(premium: PremiumModel) { 
    return this.httpService.post('https://localhost:44316/PremiumCalculation', premium)
  }

}
