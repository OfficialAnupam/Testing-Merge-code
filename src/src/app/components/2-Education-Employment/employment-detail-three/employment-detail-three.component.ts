import { Component, OnInit, ViewChild } from '@angular/core';
import { Options, LabelType } from 'ng5-slider';
import { Pipe, PipeTransform } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Validators, FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { HttpService } from 'src/app/Services/http.service';
@Component({
  selector: 'app-employment-detail-three',
  templateUrl: './employment-detail-three.component.html',
  styleUrls: ['./employment-detail-three.component.scss']
})
export class EmploymentDetailThreeComponent implements OnInit {

  constructor(private router: Router,
    private service: HttpService,
    private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute) { }



  Company: string = '';
  company: any;
  CustomerID: any;
  isDisabled2: boolean = false;
  buttonhide: boolean = false;
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

  }
  gridsize: number = 20;

  updateSetting(event: any) {
    this.gridsize = event.value;
    this.buttonhide = true;
    // console.log(this.gridsize, 'anupam');

  }
  response: any;
  Loader1: boolean = false;
  errorMessage: any;
  decision: any;
  offer: any;
  AArequired: any;
  continueFour() {
    this.isDisabled2 = true;
    this.Loader1 = true;
    this.company = this.Company;
    // if (this.Company == '') {
    //   this.isDisabled2 = false;
    //   this.Loader1 = false;
    // }
    // else {

    this.service.UpdateMonthlyIncome(this.CustomerID, this.gridsize).subscribe(res => {
      this.response = res;
      this.isDisabled2 = false;
      this.decision = this.response.Data.Decision
      this.offer = this.response.Data.Offer_Amount;
      sessionStorage.setItem('OffeerAmount', this.offer)
      this.AArequired = this.response.Data.AA_Required
      // console.log(this.response.Status, "")
      if (this.response.Status == 200 && this.decision == 'Pre Approved' && this.offer != '') {
        this.Loader1 = false;
        sessionStorage.setItem('CheckEligible', this.response.Message)
        this.router.navigate(['retailer-eligible'])
        // console.log(this.response, 'Dfghjkl;')

      } else {

        this.Loader1 = false;
        this.isDisabled2 = false;
        this.buttonhide = false;
        // this.Erroremail=true;
        // this.error='field is required';
      }


    }, (error) => {
      console.error('error caught in component')
      this.errorMessage = "Technical Error";
      this.Loader1 = false;
      this.buttonhide = false;
      this.isDisabled2 = false;

    })
  }
  // }

  ExitResponse: any
  exit() {
    this.service.Exit(this.ApplicationId, "Exit_From_Average_Monthly_Income_Screen", "Gracefull_Exit", this.Customer_name, this.mobile,
      "lorem@gmail.com", "101, SV Road", "Opp. Govt. Hospital", "Maharashtra", '201301', this.pan, "HDTEST BANK", "14361", "9 months", "10392").subscribe(res => {
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
