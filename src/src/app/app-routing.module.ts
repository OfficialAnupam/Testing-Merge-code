import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OtpPageThreeComponent } from './components/1-Retailer-Journey/otp-page/otp-page-three.component';

import { RetailerDobPageSixComponent } from './components/1-Retailer-Journey/retailer-dob-page-six/retailer-dob-page-six.component';
import { RetailerEligiblePageThreeComponent } from './components/1-Retailer-Journey/retailer-eligible-page-three/retailer-eligible-page-three.component';
import { RetailerEmailPageFourComponent } from './components/1-Retailer-Journey/retailer-email-page-four/retailer-email-page-four.component';
import { RetailerGenderPageFiveComponent } from './components/1-Retailer-Journey/retailer-gender-page-five/retailer-gender-page-five.component';
import { RetailerMobilePageTwoComponent } from './components/1-Retailer-Journey/retailer-mobile-page-two/retailer-mobile-page-two.component';
import { RetailerPanPageOneComponent } from './components/1-Retailer-Journey/retailer-pan-page-one/retailer-pan-page-one.component';
import { RetailerPinPageSevenComponent } from './components/1-Retailer-Journey/retailer-pin-page-seven/retailer-pin-page-seven.component';
import { EducationDetailOneComponent } from './components/2-Education-Employment/education-detail-one/education-detail-one.component';
import { EmploymentCompanyDetailsComponent } from './components/2-Education-Employment/employment-company-details/employment-company-details.component';
import { EmploymentDetailFourComponent } from './components/2-Education-Employment/employment-detail-four/employment-detail-four.component';
import { EmploymentDetailThreeComponent } from './components/2-Education-Employment/employment-detail-three/employment-detail-three.component';
import { EmploymentDetailTwoComponent } from './components/2-Education-Employment/employment-detail-two/employment-detail-two.component';
import { EmiOfferTwoComponent } from './components/3-Loan-offers/emi-offer-two/emi-offer-two.component';
import { OfferPageOneComponent } from './components/3-Loan-offers/offer-page-one/offer-page-one.component';
import { KycVeificationOneComponent } from './components/4-KYC-Verification/kyc-veification-one/kyc-veification-one.component';
import { AddressOneComponent } from './components/5-Address/address-one/address-one.component';
import { LoanSenctionPageThreeComponent } from './components/6-Loan-senctioned/loan-senction-page-three/loan-senction-page-three.component';
import { LoanSenctionPageTwoComponent } from './components/6-Loan-senctioned/loan-senction-page-two/loan-senction-page-two.component';
import { LoanSenctionedPageOneComponent } from './components/6-Loan-senctioned/loan-senctioned-page-one/loan-senctioned-page-one.component';
import { AccountAgreegatorPageComponent } from './components/account-agreegator-page/account-agreegator-page.component';
import { CheckOfferComponent } from './components/check-offer/check-offer.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { LdsSectionComponent } from './components/lds-section/lds-section.component';
import { TechnicalErrorPageComponent } from './components/technical-error-page/technical-error-page.component';

const routes: Routes = [
  
  {path:'', component:RetailerPanPageOneComponent},
  {path:'retailer-mobile', component:RetailerMobilePageTwoComponent},
  {path:'retailer-otp',component:OtpPageThreeComponent},
  {path:'retailer-eligible', component:RetailerEligiblePageThreeComponent},
  {path:'retailer-email',component:RetailerEmailPageFourComponent},
  {path:'retailer-company',component:EmploymentCompanyDetailsComponent},
  {path:'retailer-gender', component:RetailerGenderPageFiveComponent},
  {path:'retailer-dob', component: RetailerDobPageSixComponent},
  {path:'retailer-pin', component: RetailerPinPageSevenComponent},
  {path:'education-one', component: EducationDetailOneComponent},
  {path:'employment-two', component: EmploymentDetailTwoComponent},
  {path:'employment-three', component: EmploymentDetailThreeComponent},
  {path:'employment-four', component: EmploymentDetailFourComponent},
  {path:'offer-page', component: OfferPageOneComponent},
  {path:'emi-offer', component: EmiOfferTwoComponent},
  {path:'kyc-verification', component: KycVeificationOneComponent},
  {path:'address-one', component: AddressOneComponent},
  {path:'loan-senction', component: LoanSenctionedPageOneComponent},
  {path:'loan-senction-two', component: LoanSenctionPageTwoComponent},
  {path:'loan-senction-three', component: LoanSenctionPageThreeComponent},
  {path:'Lds-page', component: LdsSectionComponent},
  {path:'error-page',component:ErrorPageComponent},
  {path:'technical-error-page',component:TechnicalErrorPageComponent},
  {path:'Account-page',component:AccountAgreegatorPageComponent},
  {path:'check-offer',component:CheckOfferComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
