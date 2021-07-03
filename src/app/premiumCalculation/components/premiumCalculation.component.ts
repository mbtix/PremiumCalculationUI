import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { PremiumCalculationService } from '../services/premiumCalculation.service'
import { PremiumModel } from '../model/common'


@Component({
  selector: 'app-login',
  templateUrl: './premiumCalculation.component.html',
  styleUrls: ['./premiumCalculation.css'],
  providers: [PremiumCalculationService]
})
export class PremiumCalculationComponent implements OnInit {

  premium: PremiumModel;
  isValid: boolean;
  constructor(private router: Router, private premiumService: PremiumCalculationService) { }

  ngOnInit() {
    this.premium = new PremiumModel();
    this.isValid = false;

  }
  //#region Validation
  validateFields(event: string) {
    
    if (event == 'a' && (!this.premium.Age || (this.premium.Age && (this.premium.Age > 75 || this.premium.Age < 18)))) {
      this.formErrors.Age = "Age is mandatory and should be between 18 and 75."
      this.isValid = false;
      this.premium.Occupation = null;
      return;
    } else {
      this.formErrors.Age = "";
      
    }
    if (event == 'd' && !this.premium.DeathAssured || (this.premium.DeathAssured && (this.premium.DeathAssured < 1000 || this.premium.DeathAssured > 500000))) {
      this.formErrors.DeathAssured = "Death Assured should be between 1000 and 500000."
      this.isValid = false;
      this.premium.Occupation = null;
      return;
    } else {
      this.formErrors.DeathAssured = "";
    }
    if (event == 'dob' && this.premium.DOB) {
      const todayDate = new Date();
      const ageyear = todayDate.getFullYear() - this.premium.DOB.getFullYear();
      if (ageyear < 18) {
        this.formErrors.DOB = "DOB should be minimum of 18 years, please select the date accordingly.";
        this.isValid = false;
        this.premium.Occupation = null;
        return;
      } else {
        this.formErrors.DOB = '';
        
      }
    }
    if (event == 'dob' && !this.premium.DOB) {
      this.formErrors.DOB = "DOB is mandatory."
      this.isValid = false;
      this.premium.Occupation = null;
      return;
    } else {
      this.formErrors.DOB = "";
    }
    if (event == 'name' && !this.premium.FullName || this.premium.FullName == '') {
      this.formErrors.FullName = "Full name is mandatory."
      this.isValid =  false;
      this.premium.Occupation = null;
      return;
    } else {
      this.formErrors.FullName = "";
    }
    this.isValid = true;
    return this.isValid;
  }
  //#endregion

   //#region calculation
  calculatePremium() {
    if(!this.isValid) {
      return false;
    }
    this.premiumService.getCalculatedPremium(this.premium).subscribe(success => {

      if(success < 1) {
        this.formErrors.ApiError = 'Error while calculating premium';
        return
      }
      this.premium.CalculatedValue = success;
    });
  }
  //#endregion
  
  //Form Errors
  formErrors = {
    "DOB": "",
    "Age": "",
    "DeathAssured": "",
    "FullName": '',
    "Occupation": '',
    "ApiError": ''
  };
}



