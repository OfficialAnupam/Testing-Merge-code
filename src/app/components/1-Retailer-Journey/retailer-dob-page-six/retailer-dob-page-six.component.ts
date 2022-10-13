import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Validators, FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { HttpService } from 'src/app/Services/http.service';

@Component({
  selector: 'app-retailer-dob-page-six',
  templateUrl: './retailer-dob-page-six.component.html',
  styleUrls: ['./retailer-dob-page-six.component.scss']
})
export class RetailerDobPageSixComponent implements OnInit {

  constructor(private router: Router,
    private service: HttpService,
    private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute) { }

  CustomerID: any;
  Errordob: boolean = false;
  error: any;
  DOB: any;
  dob: any;
  response: any;
  twentyYears = new Date();
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
    this.twentyYears.setFullYear(this.twentyYears.getFullYear() - 20);
  }
  // getErrorDate() {
  //   return this.detailsForm.get('DOB').hasError('required') ? 'Field is required' : ''
  // }
  buttonhide: boolean = false;
  Loader1: boolean = false;
  parseDOB(DOB: any): String {
    const month = DOB.getUTCMonth() + 1;
    const date = DOB.getUTCDate() + 1;
    const year = DOB.getUTCFullYear();
    return year + "-" + ((month + "").length == 1 ? "0" + month : month) + "-" + ((date + "").length == 1 ? "0" + date : date);
  }



  continuePIN() {
    this.Loader1 = true;
    this.isDisabled1 = true;
    this.dob = this.parseDOB(this.DOB)
    this.service.updatedob(this.CustomerID, this.dob).subscribe(res => {
      this.response = res;
      this.Loader1 = false;
      if (this.response.Data == true) {
        this.Loader1 = false;
        // console.log(this.response, "dfghjkl;'")
        this.router.navigate(['retailer-email'])
      } else {
        this.Loader1 = false;
        this.Errordob = true;
        this.isDisabled1 = false;
        this.error = 'Valid DOB Required!'
      }

    });

  }


  DateOfBirth(event: any) {
    // console.log(event)
    this.buttonhide = true;
  }

  ExitResponse: any
  exit() {
    this.service.Exit(this.ApplicationId, "Exit_From_DOB_Screen", "Gracefull_Exit", this.Customer_name, this.mobile,
      "ak@gmail.com", "101, SV Road", "Opp. Govt. Hospital", "Maharashtra", this.Pin, this.pan, "HDTEST BANK", "14361", "9 months", "10392").subscribe(res => {
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
