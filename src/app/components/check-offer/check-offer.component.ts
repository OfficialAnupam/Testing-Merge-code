import { Component, OnDestroy, OnInit } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Validators, FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { HttpService } from 'src/app/Services/http.service';

@Component({
  selector: 'app-check-offer',
  templateUrl: './check-offer.component.html',
  styleUrls: ['./check-offer.component.scss']
})
export class CheckOfferComponent implements OnInit {

  constructor(private router: Router,
    private service: HttpService, private device: DeviceDetectorService,
    private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute) {

  }
  CustomerID: any
  offercallback: any
  CustomerName: any
  CustomerName1: any
  pan: any;
  mobile: any
  ApplicationId: any
  Customer_name: any;
  Callback_url: any
  Email: any
  Pin: any
  Exit1: boolean = false;
  Exit2: boolean = false
  ngOnInit(): void {
    // this.Loader1=true
    this.CustomerName1 = sessionStorage.getItem("CustomerName");
    this.CustomerName = this.CustomerName1.split(' ')[0]
    this.CustomerID = sessionStorage.getItem("CustomerId");
    this.pan = sessionStorage.getItem("PanNumber");
    this.mobile = sessionStorage.getItem('Mobile');
    this.ApplicationId = sessionStorage.getItem('ApplictionId')
    this.Customer_name = sessionStorage.getItem("CustomerName");
    this.Callback_url = sessionStorage.getItem('Calback');
    this.Pin = sessionStorage.getItem('PIN')
    this.Email = sessionStorage.getItem("Email")
    this.checkcallbackstatus()

  }

  // var studentFullName="John Smith";
  // var details=[]
  // var details=studentFullName.split(' ');
  // console.log("StudentFirstName="+details[0])
  // console.log("StudentLastName="+details[1]);
  error: any
  checkcallbackstatus() {
    this.Loader1 = true;
    this.service.checkcallback(this.CustomerID).subscribe(res => {
      this.offercallback = res.Data.Offer_Decision;
      // this.offercallback='PreApproved'

      if (this.offercallback == 'PreApproved') {
        this.router.navigate(['/emi-offer'])
        return;

      }
      if (this.offercallback == 'Rejected') {
        this.Loader1 = false;
        // this.router.navigate(['/emi-offer'])
        this.error = 'Sorry! The lender has rejected your application.';
        this.Exit2 = true;
        this.Exit1 = true;
        return;

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
          this.count = 0;
          // this.Error = true;
          this.error = 'Technical Error';
          this.Exit3 = true;
          this.Exit2 = false;
          this.Exit1 = true;
        }
        return;
      }


    });
  }
  count: number = 0;
  Loader1: boolean = false

  ExitResponse: any
  Exit3: boolean = false
  exit2() {
    this.service.Exit(this.ApplicationId, "Application_Rejected", "Lender has rejected the application", this.Customer_name, this.mobile,
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
  exit3() {
    this.service.Exit(this.ApplicationId, "Technical_Error", "Technical_Error 'Along with reason if available'", this.Customer_name, this.mobile,
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
  exit() {
    this.service.Exit(this.ApplicationId, "Exit_From_Fetching_offers_screen", "Gracefull_Exit", this.Customer_name, this.mobile,
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
      // window.location.href = this.redirection;
    })
  }
}
