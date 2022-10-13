import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/Services/http.service';

@Component({
  selector: 'app-retailer-eligible-page-three',
  templateUrl: './retailer-eligible-page-three.component.html',
  styleUrls: ['./retailer-eligible-page-three.component.scss']
})
export class RetailerEligiblePageThreeComponent implements OnInit {

  constructor(private router: Router, private service: HttpService,) { }
  Message: any;
  Amount1: any
  Amount: any;
  pan: any;
  mobile: any
  ApplicationId: any
  Customer_name: any;
  Callback_url: any

  ngOnInit(): void {
    this.Message = sessionStorage.getItem('CheckEligible');
    this.Amount1 = sessionStorage.getItem('OffeerAmount')
    this.pan = sessionStorage.getItem("PanNumber");
    this.mobile = sessionStorage.getItem('Mobile');
    this.ApplicationId = sessionStorage.getItem('ApplictionId')
    this.Customer_name = sessionStorage.getItem("CustomerName");
    this.Callback_url = sessionStorage.getItem('Calback');
    this.Amount = Intl.NumberFormat('en-US').format(this.Amount1);
  }
  continueEmail() {
    this.router.navigate(['retailer-pin'])
  }

  ExitResponse: any
  exit() {
    this.service.Exit(this.ApplicationId, "Checking for loan eligibility wait screen", "Gracefull_Exit", this.Customer_name, this.mobile,
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
