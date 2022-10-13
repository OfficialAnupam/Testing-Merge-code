import { Component, OnInit } from '@angular/core';

import { Validators, FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { HttpService } from 'src/app/Services/http.service';

@Component({
  selector: 'app-employment-company-details',
  templateUrl: './employment-company-details.component.html',
  styleUrls: ['./employment-company-details.component.scss']
})
export class EmploymentCompanyDetailsComponent implements OnInit {

  constructor(private router: Router,
    private service: HttpService,
    private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute) { }

  Company: string = '';
  company: any;
  CustomerID: any;
  isDisabled2: boolean = false;
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


  response: any;
  Loader1: boolean = false;
  errorMessage: any;

  CompanyName(event: any) {
    // console.log(event)
    this.buttonhide = true;
    // this.company = this.Company;
    // console.log(this.Company,"")
  }

  buttonhide: boolean = false;

  continueFour() {
    this.isDisabled2 = true;
    this.Loader1 = true;
    this.company = this.Company;
    console.log(this.Company, "")
    if (this.Company == '') {
      this.isDisabled2 = false;
      this.Loader1 = false;
    }
    else {

      this.service.UpdateCompanyName(this.CustomerID, this.company).subscribe(res => {
        this.response = res;
        this.isDisabled2 = false;
        // console.log(this.response.Status, "")
        if (this.response.Data == true) {
          this.Loader1 = false;
          // sessionStorage.setItem('CheckEligible',this.response.Data.Message)
          this.router.navigate(['employment-four'])
          console.log(this.response, 'Dfghjkl;')

        } else {

          this.Loader1 = false;
          this.isDisabled2 = false;
          this.errorMessage = "Error";

        }


      }, (error) => {
        console.error('error caught in component')
        this.errorMessage = "Technical Error";
        this.Loader1 = false;

      })
    }
  }
  ExitResponse: any
  exit() {
    this.service.Exit(this.ApplicationId, "Exit_From_Company_Name_Screen", "Gracefull_Exit", this.Customer_name, this.mobile,
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
