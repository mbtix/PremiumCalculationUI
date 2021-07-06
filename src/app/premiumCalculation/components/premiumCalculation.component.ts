import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { PremiumCalculationService } from '../services/premiumCalculation.service'
import { PremiumModel } from '../model/common'
import { windowWhen } from 'rxjs/operators';
import { Pipe, PipeTransform } from "@angular/core";

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

    if (event == 'd' && !this.premium.DeathInsured || (this.premium.DeathInsured && (this.premium.DeathInsured < 1000 || this.premium.DeathInsured > 500000))) {
      this.formErrors.DeathAssured = "Death Insured should be between 1000 and 500000."
      this.isValid = false;
      this.premium.Occupation = null;
      return;
    } else {
      this.formErrors.DeathAssured = "";
    }
    if (event == 'dob' && this.premium.DOB) {
      const todayDate = new Date();
      const ageyear = todayDate.getFullYear() - this.premium.DOB.getFullYear();
      if (ageyear < 10) {
        this.formErrors.DOB = "Age should be above 9 years, please select the date accordingly.";
        this.isValid = false;
        this.premium.Occupation = null;
        return;
      } else {
        this.formErrors.DOB = '';
        this.calculateAge();

      }
    }
    if (event == 'dob' && !this.premium.DOB) {
      this.formErrors.DOB = "DOB is mandatory."
      this.isValid = false;
      this.premium.Occupation = null;
      return;
    } else {
      this.formErrors.DOB = "";
      this.calculateAge();
    }
    if (event == 'name' && !this.premium.FullName || this.premium.FullName == '') {
      this.formErrors.FullName = "Full name is mandatory."
      this.isValid = false;
      this.premium.Occupation = null;
      return;
    } else {
      this.formErrors.FullName = "";
    }
    this.isValid = true;
    return this.isValid;
  }
  //#endregion

  //#region Age calculation
  calculateAge() {
    if (this.premium.DOB) {
      let timeDiff = Math.abs(Date.now() - this.premium.DOB.getTime());
      this.premium.Age = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365.25);
    }

  }
  //#endregion

  //#region clear fields
  clearAllFields() {
    this.premium = new PremiumModel();
  }
  //#endregion

  //#region calculation
  calculatePremium() {
    if (!this.isValid) {
      return false;
    }
    this.premiumService.getCalculatedPremium(this.premium).subscribe(success => {

      if (success < 1) {
        this.formErrors.ApiError = 'Something went wrong, please reenter all mandatory fields';
        return
      }
      // Create our number formatter.
      var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      });

      this.premium.CalculatedValue = formatter.format(success); /* $2,500.00 */

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



