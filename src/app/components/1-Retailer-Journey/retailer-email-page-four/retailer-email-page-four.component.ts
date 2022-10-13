import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/Services/http.service';

@Component({
  selector: 'app-retailer-email-page-four',
  templateUrl: './retailer-email-page-four.component.html',
  styleUrls: ['./retailer-email-page-four.component.scss']
})
export class RetailerEmailPageFourComponent implements OnInit {

  constructor(private router: Router,
    private service: HttpService,
    private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute) {
  }
  CustomerID: any;
  Loader1: boolean = false;
  email: any;
  Email1: any;
  response: any;
  EmailForm: any;
  Erroremail: boolean = false;
  error: any;
  submitted = false
  isDisabled1: boolean = false;
  pan: any;
  mobile: any
  ApplicationId: any
  Customer_name: any;
  Callback_url: any
  Pin: any;
  ExitEmail: boolean = false;
  ngOnInit(): void {
    this.CustomerID = sessionStorage.getItem("CustomerId");
    this.pan = sessionStorage.getItem("PanNumber");
    this.mobile = sessionStorage.getItem('Mobile');
    this.ApplicationId = sessionStorage.getItem('ApplictionId')
    this.Customer_name = sessionStorage.getItem("CustomerName");
    this.Pin = sessionStorage.getItem('PIN')
    this.Callback_url = sessionStorage.getItem('Calback')
    this.myForm();
  }

  get f() {
    return this.EmailForm.controls;
  }
  emailValidator = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  myForm(): void {

    this.EmailForm = this.formBuilder.group({
      Email: new FormControl('', [Validators.required, Validators.pattern(this.emailValidator), Validators.maxLength(50)])
    });

  }

  continueGender() {
    this.isDisabled1 = true;
    this.Email1 = this.email;
    sessionStorage.setItem("Email", this.Email1)
    this.Loader1 = true;
    if (this.email === undefined) {
      this.Loader1 = false;
      this.isDisabled1 = false;
      this.Erroremail = true;
      this.ExitEmail = true;
      this.error = 'email Feild Required!'

    }
    else {

      this.Loader1 = true;
      this.service.CheckEmail(this.CustomerID, this.Email1).subscribe(res => {
        this.response = res;
        if (this.response.Data == true) {
          this.router.navigate(['education-one'])
        }

        // sessionStorage.setItem('CheckEligible',this.response.Data.Message)
        // if (this.response.Data.Eligibility_Status == 'Eligible') {

        //   this.router.navigate(['retailer-gender'])
        // }
        else {
          this.Loader1 = false;
          this.isDisabled1 = false;
          this.ExitEmail = true;
        }
      }, (error) => {
        this.Loader1 = false;
        this.isDisabled1 = false;
        this.ExitEmail = true;
      })

    }




  }
  ExitResponse: any

  exit1() {

    this.service.Exit(this.ApplicationId, "Exit_From_Email_Screen", "Invalid_Email", this.Customer_name, this.mobile,
      this.Email1, "101, SV Road", "Opp. Govt. Hospital", "Maharashtra", this.Pin, this.pan, "HDTEST BANK", "14361", "9 months", "10392").subscribe(res => {
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

    this.service.Exit(this.ApplicationId, "Exit_From_Email_Address_Screen", "Gracefull_Exit", this.Customer_name, this.mobile,
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
