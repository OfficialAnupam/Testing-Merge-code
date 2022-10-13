import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Validators, FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { HttpService } from 'src/app/Services/http.service';

@Component({
  selector: 'app-retailer-pin-page-seven',
  templateUrl: './retailer-pin-page-seven.component.html',
  styleUrls: ['./retailer-pin-page-seven.component.scss']
})
export class RetailerPinPageSevenComponent implements OnInit {
  leadcreated: any;
  Contact_id: any;
  DedupeStatus: any;
  counter: boolean = false;
  isDisabled1: boolean = false;
  constructor(private router: Router,
    private service: HttpService,
    private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute) { }
  CustomerID: any;
  Loader1: boolean = false;
  Errorpin: Boolean = false;
  error: any;
  pan: any;
  mobile: any
  ApplicationId: any
  Customer_name: any;
  Callback_url: any
  Email: any
  ngOnInit(): void {
    this.CustomerID = sessionStorage.getItem("CustomerId");
    this.pan = sessionStorage.getItem("PanNumber");
    this.mobile = sessionStorage.getItem('Mobile');
    this.ApplicationId = sessionStorage.getItem('ApplictionId')
    this.Customer_name = sessionStorage.getItem("CustomerName");
    this.Callback_url = sessionStorage.getItem('Calback');

    this.Email = sessionStorage.getItem("Email")
  }
  checked = false;
  pin: any;
  Pincode: any;
  response: any;
  continueEducation() {
    this.isDisabled1 = true;
    this.Loader1 = true;
    this.pin = this.Pincode;
    sessionStorage.setItem('PIN', this.pin)
    this.service.updatepincode(this.CustomerID, this.pin).subscribe(res => {
      this.response = res;

      // this.Loader1 = false;


      if (this.response.Data == 0) {
        // if (this.response.Data.Contat_Id != '' && this.response.Data.Lead_Id != '') {
        // this.Loader1 = false;
        this.Loader1 = false;
        this.Errorpin = true;
        this.isDisabled1 = false;
        this.pinExit1 = true;
        this.pinExit = false;
        this.error = 'Please enter valid pincode'

      }

      else {
        this.Errorpin = false;

        this.checkcallbackstatus()
      }

    }, (error) => {
      console.error('error caught in component')
      this.Loader1 = false;
      this.Errorpin = true;
      this.isDisabled1 = false;
      this.pinExit2 = true;
      this.pinExit = false;
      this.error = 'Technical Error';
     
    }

    );

  }
  contactid: any;
  Dedupe: any;
  Leadid: any;
  pinExit2: boolean = false
  pinExit1: boolean = false
  checkcallbackstatus() {
    this.Loader1 = true;
    this.service.checkcallback(this.CustomerID).subscribe(res => {
      console.log(res);
      // this.Loader1=true;
      this.contactid = res.Data.Contact_ID;
      console.log(this.contactid, 'contactId')
      this.Dedupe = res.Data.Dedupe_Status;
      // this.Dedupe = 'Pre Approved1';

      this.Leadid = res.Data.Lead_ID;
      sessionStorage.setItem('LeadID', this.Leadid)
      sessionStorage.setItem('ContactID', this.contactid)
      console.log(this.Leadid, "LeadId")
      if (this.contactid != '' && this.Leadid != '' && this.Dedupe == 'Pre Approved') {
        this.Loader1 = false;
        this.router.navigate(['retailer-gender'])
      }
      // if (this.Dedupe != 'Pre Approved') {
      //   this.Loader1 = false;
      //   this.Errorpin = true;
      //   this.isDisabled1 = false;
      //   this.error = 'Sorry! The lender has rejected your application.' 
      // }
      else {
        this.count += 1;
        // console.log(this.count,'count');
        if (this.count <= 50) {
          setTimeout(() => {
            this.checkcallbackstatus();

          }, 4000);

        }
        else {
          this.isDisabled1 = false
          this.Loader1 = false
          this.count = 0;
          this.router.navigate(['/technical-error-page']);
        }
        return;
      }


    });
  }

  count: number = 0
  count1: number = 0
  pinExit: boolean = true;
  ExitResponse: any

  exit2() {
    this.service.Exit(this.ApplicationId, "Application_Rejected", "Lender has rejected the application", this.Customer_name, this.mobile,
      "lorem@gmail.com", "101, SV Road", "Opp. Govt. Hospital", "Maharashtra", "400001", this.pan, "HDTEST BANK", "14361", "9 months", "10392").subscribe(res => {
        this.ExitResponse = res;
        if (this.ExitResponse.status == 200) {
          this.Callback();
        }
       
      }, (error) => {
        console.log(error)
        this.Callback();
      })
  }
  exit1() {
    this.service.Exit(this.ApplicationId, "Exit_From_PIN_Screen", "Invalid_Pincode", this.Customer_name, this.mobile,
      "lorem@gmail.com", "101, SV Road", "Opp. Govt. Hospital", "Maharashtra", "400001", this.pan, "HDTEST BANK", "14361", "9 months", "10392").subscribe(res => {
        this.ExitResponse = res;
        if (this.ExitResponse.status == 200) {
          this.Callback();
        }
  
      }, (error) => {
        console.log(error)
        this.Callback();
      })
  }
  exit() {
    this.service.Exit(this.ApplicationId, "Exit_From_PIN_Screen", "Gracefull_Exit", this.Customer_name, this.mobile,
      "lorem@gmail.com", "101, SV Road", "Opp. Govt. Hospital", "Maharashtra", "400001", this.pan, "HDTEST BANK", "14361", "9 months", "10392").subscribe(res => {
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
    //  const redirectionc={
    //   Application_ID:this.response1.Data.Application_ID,
    //   Status:"Exit"
    //  }

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
