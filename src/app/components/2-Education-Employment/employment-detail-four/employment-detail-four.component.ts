import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Validators, FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { HttpService } from 'src/app/Services/http.service';

@Component({
  selector: 'app-employment-detail-four',
  templateUrl: './employment-detail-four.component.html',
  styleUrls: ['./employment-detail-four.component.scss']
})
export class EmploymentDetailFourComponent implements OnInit {
  downpayment: any;
  processingfee: any;
  totalamount: any;
  EmiAmount: any;
  Tenor: any;

  constructor(private router: Router,
    private service: HttpService,
    private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute) { }

  // isDisabled: boolean=false;
  EmploymentDetail: string = '';
  CustomerID: any;
  isValidFormSubmitted = false;
  offerresponse: any;
  isDisabled1: boolean = false;
  pan: any;
  mobile: any
  ApplicationId: any
  Customer_name: any;
  Callback_url: any
  Email: any
  Pin: any

  ngOnInit(): void {
    this.CustomerID = sessionStorage.getItem("CustomerId");
    this.pan = sessionStorage.getItem("PanNumber");
    this.mobile = sessionStorage.getItem('Mobile');
    this.ApplicationId = sessionStorage.getItem('ApplictionId')
    this.Customer_name = sessionStorage.getItem("CustomerName");
    this.Callback_url = sessionStorage.getItem('Calback');
    this.Pin = sessionStorage.getItem('PIN')
    this.Email = sessionStorage.getItem("Email")
    // this.Loader1=true;
  }
  response: any;
  Loader1: boolean = false;
  OfferAmount: any
  EmploymentDetail1(event: any) {
    // console.log(event)
    this.buttonhide = true;
  }

  buttonhide: boolean = false;

  onFormSubmit(form: NgForm) {
    this.Loader1 = true;
    this.isDisabled1 = true;

    this.EmploymentDetail = form.controls['EmploymentDetail'].value;
    sessionStorage.setItem('EmploymentDetail', this.EmploymentDetail)
    this.isValidFormSubmitted = false;

    if (form.invalid) {
      this.Loader1 = false;
      this.isValidFormSubmitted = false;
      return;
    }
    if (this.EmploymentDetail === undefined) {
      this.Loader1 = false;

      this.isValidFormSubmitted = false;

    }
    this.Loader1 = true;

    this.isValidFormSubmitted = true;


    this.service.UpdateIndustry(this.CustomerID, this.EmploymentDetail).subscribe(res => {
      this.response = res;
      // this.isDisabled=false;
      console.log(this.response.Status, "")
      if (this.response.Data.Contact_Update_Status == 204 && this.response.Data.Lead_Update_Status == 204) {
        // this.router.navigate(['Account-page'])
        this.checkcallbackstatus()
      } else {
        this.isValidFormSubmitted = false;
        this.Loader1 = false;
        this.isDisabled1 = false;
        this.Error = true;
        this.error = 'Technical Error';
      }


    }, (error) => {

      this.Error = true;
      this.error = 'Technical Error'
      this.Loader1 = false;

    })
  }
  Error: boolean = false;
  error: any;
  count: number = 0;
  ReadyDecision: any;
  offercallback: any;
  LoanAmount: any;
  AArequired: any
  checkcallbackstatus() {
    this.Loader1 = true;
    this.service.checkcallback(this.CustomerID).subscribe(res => {
      console.log(res);
      // this.Loader1=true;
      this.ReadyDecision = res.Data.Ready_For_Decision;
      this.offercallback = res.Data.Offer_Callback;
      this.AArequired = res.Data.AA_Required
      this.LoanAmount = res.Data.Eligible_Loan_Amount_INR__c;
      sessionStorage.setItem('OfferAmount', this.LoanAmount);
      console.log(this.ReadyDecision, 'contactId')

      if (this.AArequired == "Yes") {
        this.Loader1 = false;
        this.router.navigate(['Account-page'])
        return
      }
      if (this.AArequired == "No") {

        this.service.ReadyForDecision(this.CustomerID).subscribe(res => {
          this.response = res;

          if (this.response.Data == 204) {
            this.router.navigate(['/check-offer'])
            // this.checkcallbackstatus1();
            return

          } else {

            this.Loader1 = false;
            this.Error = true;
            this.error = "Error";

          }


        }, (error) => {
          console.error('error caught in component');
          this.Error = true;
          this.error = "Technical Error";
          this.Loader1 = false;

        })

      }

      else {
        this.count += 1;
        // console.log(this.count,'count');
        if (this.count <= 50) {
          setTimeout(() => {
            this.checkcallbackstatus();

          }, 4000);

        }
        else {

          this.Loader1 = false;
          this.isDisabled1 = false;
          this.count = 0;

          this.Error = true;
          this.error = 'Technical Error';
        }
        return;
      }


    });
  }
  tab: any = 'tab1';
  tab1: any
  tab2: any
  tab3: any
  tab4: any
  tab5: any
  tab6: any
  tab7: any
  tab8: any;
  tab9: any
  tab10: any
  tab11: any
  tab12: any
  tab13: any
  step: any;

  onClick(check: any) {
    console.log(check);
    if (check == 1) {
      this.tab = 'tab1';
    } else if (check == 2) {
      this.tab = 'tab2';
    }
    else if (check == 3) {
      this.tab = 'tab3';
    }
    else if (check == 4) {
      this.tab = 'tab4';
    }
    else if (check == 5) {
      this.tab = 'tab5';
    }
    else if (check == 6) {
      this.tab = 'tab6';
    }
    else if (check == 7) {
      this.tab = 'tab7';
    }
    else if (check == 8) {
      this.tab = 'tab8';
    }
    else if (check == 9) {
      this.tab = 'tab9';
    }
    else if (check == 10) {
      this.tab = 'tab10';
    }
    else if (check == 11) {
      this.tab = 'tab11';
    }
    else if (check == 12) {
      this.tab = 'tab12';
    }
    else {
      this.tab = 'tab13';
    }
  }

  ExitResponse: any
  exit() {
    this.service.Exit(this.ApplicationId, "Exit_From_Industry_Screen", "Gracefull_Exit", this.Customer_name, this.mobile,
      this.Email, "101, SV Road", "Opp. Govt. Hospital", "Maharashtra", this.Pin, this.pan, "HDTEST BANK", "14361", "9 months", "10392").subscribe(res => {
        this.ExitResponse = res;
        if (this.ExitResponse.status == 200) {
          this.Callback();
        }
        // if(this.ExitResponse.status==404){
        //   this.Callback();
        // }

        console.log(this.ExitResponse)
      }, (error) => {
        console.log(error)
        this.Callback();
      })
  }
  Response1: any;
  Response2: any;
  RedirectCallback: any;
  redirection: any
  Callback() {

    this.service.CallBack(this.ApplicationId, "Exit").subscribe(response => {
      this.Response1 = response;

      this.RedirectCallback = this.Callback_url
      console.log(this.Response1, "Callback response")

      this.redirection = this.Callback_url + '/affordability/callback?applicationId=' + this.ApplicationId + '&status=exit'
      console.log(this.redirection, "redir")
      window.location.href = this.redirection;
    })
  }
}
