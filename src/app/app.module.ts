import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
// import { Ng5SliderModule } from 'ng5-slider';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NgOtpInputModule } from 'ng-otp-input';

import { RetailerPanPageOneComponent } from './components/1-Retailer-Journey/retailer-pan-page-one/retailer-pan-page-one.component';
import { RetailerMobilePageTwoComponent } from './components/1-Retailer-Journey/retailer-mobile-page-two/retailer-mobile-page-two.component';
import { RetailerEligiblePageThreeComponent } from './components/1-Retailer-Journey/retailer-eligible-page-three/retailer-eligible-page-three.component';
import { EducationDetailOneComponent } from './components/2-Education-Employment/education-detail-one/education-detail-one.component';
import { EmploymentDetailTwoComponent } from './components/2-Education-Employment/employment-detail-two/employment-detail-two.component';
import { RetailerEmailPageFourComponent } from './components/1-Retailer-Journey/retailer-email-page-four/retailer-email-page-four.component';
import { RetailerGenderPageFiveComponent } from './components/1-Retailer-Journey/retailer-gender-page-five/retailer-gender-page-five.component';
import { RetailerDobPageSixComponent } from './components/1-Retailer-Journey/retailer-dob-page-six/retailer-dob-page-six.component';
import { RetailerPinPageSevenComponent } from './components/1-Retailer-Journey/retailer-pin-page-seven/retailer-pin-page-seven.component';
import { EmploymentDetailThreeComponent } from './components/2-Education-Employment/employment-detail-three/employment-detail-three.component';
import { EmploymentDetailFourComponent } from './components/2-Education-Employment/employment-detail-four/employment-detail-four.component';
import { OfferPageOneComponent } from './components/3-Loan-offers/offer-page-one/offer-page-one.component';
import { EmiOfferTwoComponent } from './components/3-Loan-offers/emi-offer-two/emi-offer-two.component';
import { KycVeificationOneComponent } from './components/4-KYC-Verification/kyc-veification-one/kyc-veification-one.component';
import { AddressOneComponent } from './components/5-Address/address-one/address-one.component';
import { LoanSenctionedPageOneComponent } from './components/6-Loan-senctioned/loan-senctioned-page-one/loan-senctioned-page-one.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoaderComponent } from './components/loader/loader.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { LdsSectionComponent } from './components/lds-section/lds-section.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomCurrency } from './pipes/customCurrency.pipe';
import { inrFormat} from './currencyFormat';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatCardModule} from '@angular/material/card';
import { LoanAgreementComponent } from './components/loan-agreement/loan-agreement.component';
// import { DatePipe, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { DatePipe} from '@angular/common';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { BackButtonDisableModule } from 'angular-disable-browser-back-button';
import { MatNativeDateModule,MAT_DATE_LOCALE } from '@angular/material/core';
import {MatDialogModule} from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { TechnicalErrorPageComponent } from './components/technical-error-page/technical-error-page.component'; 
import { OtpPageThreeComponent } from './components/1-Retailer-Journey/otp-page/otp-page-three.component';
import { EmploymentCompanyDetailsComponent } from './components/2-Education-Employment/employment-company-details/employment-company-details.component';
import { AccountAgreegatorPageComponent } from './components/account-agreegator-page/account-agreegator-page.component';
import { CheckOfferComponent } from './components/check-offer/check-offer.component';


@NgModule({
  declarations: [
    AppComponent,
    OtpPageThreeComponent,
    RetailerPanPageOneComponent,
    RetailerMobilePageTwoComponent,
    RetailerEligiblePageThreeComponent,
    EducationDetailOneComponent,
    EmploymentDetailTwoComponent,
    RetailerEmailPageFourComponent,
    RetailerGenderPageFiveComponent,
    RetailerDobPageSixComponent,
    RetailerPinPageSevenComponent,
    EmploymentDetailThreeComponent,
    EmploymentDetailFourComponent,
    OfferPageOneComponent,
    EmiOfferTwoComponent,
    KycVeificationOneComponent,
    AddressOneComponent,
    LoanSenctionedPageOneComponent,
    LoaderComponent,
    LdsSectionComponent,
    CustomCurrency,
    LoanAgreementComponent,
    ErrorPageComponent,
    TechnicalErrorPageComponent,
    inrFormat,
    EmploymentCompanyDetailsComponent,
    AccountAgreegatorPageComponent,
    CheckOfferComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgOtpInputModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSliderModule,
    NgbModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatDialogModule,
    CommonModule,
    BackButtonDisableModule.forRoot({
      preserveScrollPosition: true
    })
    // Ng5SliderModule,
  ],
  // providers: [],
  // schemas: [CUSTOM_ELEMENTS_SCHEMA],
  // {provide: LocationStrategy, useClass: HashLocationStrategy},
  providers: [{provide: MAT_DATE_LOCALE, useValue: 'en-GB'},DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
