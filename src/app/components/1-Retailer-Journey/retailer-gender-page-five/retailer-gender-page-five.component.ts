import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Validators, FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { HttpService } from 'src/app/Services/http.service';

@Component({
  selector: 'app-retailer-gender-page-five',
  templateUrl: './retailer-gender-page-five.component.html',
  styleUrls: ['./retailer-gender-page-five.component.scss']
})
export class RetailerGenderPageFiveComponent implements OnInit {

  constructor(private router: Router,
    private service: HttpService,
    private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute) { }

  isDisabled1: boolean = false;
  gender: string = '';
  isValidFormSubmitted = false;
  CustomerID: any;
  Loader1: boolean = false;
  // gender: any;
  gender1: any;
  gender2: any;
  Gender: any;
  response: any;
  Errorgender: boolean = false;

  buttonhide: boolean = false;
  pan: any;
  mobile: any
  ApplicationId: any
  Customer_name: any;
  Callback_url: any;
  Email: any;
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
  }

  // isValidFormSubmitted: boolean |null;
  Erroremail: boolean = false;
  error: any;
  checked = false;

  Gender1(event: any) {
    // console.log(event)
    this.buttonhide = true;
  }
  onFormSubmit(form: NgForm) {
    this.isDisabled1 = true;
    this.gender = form.controls['gender'].value;
    this.isValidFormSubmitted = false;
    this.Loader1 = true;
    if (form.invalid) {
      this.Loader1 = false;
      this.isValidFormSubmitted = false;
      return;

    }
    if (this.gender === undefined) {
      this.isValidFormSubmitted = false;
      this.Loader1 = false;
      this.Errorgender = true;
      this.isDisabled1 = false;
      // this.error = 'Gender field is required';

    }
    this.Loader1 = true;
    this.isValidFormSubmitted = true;
    this.isDisabled1 = true;

    this.service.updategender(this.CustomerID, this.gender).subscribe(res => {
      this.response = res;
      this.Errorgender = false;
      console.log(this.response.Status, "")
      if (this.response.Data == true) {
        this.Loader1 = false;
        this.Errorgender = false;
        this.router.navigate(['retailer-dob'])
        // console.log(this.response, 'Dfghjkl;')
        // } else {
        //   // this.isValidFormSubmitted = false;
        //   this.Loader1 = false;
        //   this.Errorgender = true;
        //   this.error = 'Gender field is required';
        // }

      }
      else {
        this.Loader1 = false;
        this.isDisabled1 = false;
        console.log("error")
      }
    });

  }

  //   continueDOB() {
  // this.Loader1=true;
  //     this.Gender = this.gender;
  //     this.service.updategender(this.CustomerID, this.Gender).subscribe(res => {
  //       this.response = res;
  //       console.log(this.response.Status,"")
  //       if(this.response.Status==200){
  //         this.Loader1=false;
  //         this.router.navigate(['retailer-dob'])
  //         console.log(this.response, 'Dfghjkl;')
  //       }else{
  //         this.Loader1=false;
  //         this.Erroremail=true;
  //         this.error='field is required';
  //       }


  //     })

  //   }


  tab: any = 'tab1';
  tab1: any
  tab2: any
  tab3: any
  step: any;
  onClick(check: any) {
    console.log(check);
    if (check == 1) {
      this.tab = 'tab1';
    } else if (check == 2) {
      this.tab = 'tab2';
    }
    else {
      this.tab = 'tab3';
    }
  }

  ExitResponse: any
  exit() {
    this.service.Exit(this.ApplicationId, "Exit_From_Gender_Screen", "Gracefull_Exit", this.Customer_name, this.mobile,
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


