import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Validators, FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HttpService } from 'src/app/Services/http.service';

@Component({
  selector: 'app-retailer-pan-page-one',
  templateUrl: './retailer-pan-page-one.component.html',
  styleUrls: ['./retailer-pan-page-one.component.scss']
})
export class RetailerPanPageOneComponent implements OnInit {

  constructor(private router: Router,
    private service: HttpService,
    private formBuilder: FormBuilder, private route: ActivatedRoute, private http: HttpClient) {

  }
  ApplicationID: any;
  Loader1: boolean = false;
  requestkeyerror: boolean = false
  pan: any;
  PanNumber: any;
  PanForm: any;
  checked = false;
  Error: boolean = false;
  error: any;
  response: any;
  response2: any;
  // Dealer_ID:"0061002473"
  ngOnInit(): void {
    sessionStorage.clear();
    localStorage.clear();
    this.Loader1 = true;
    // this.getdata();
    // this.ApplicationID = sessionStorage.getItem("ApplicationID");
    this.response2 = sessionStorage.getItem('Status')
    this.initForm();
    this.requestkey();
    // || this.response1.Status != 404

    // this.getdata();
    // this.pan = sessionStorage.getItem("PanNumber");


  }

  downpayment: any
  requestKey: any;
  response1: any;
  isDisabled1: boolean = false;
  requestkey() {
    this.route.queryParams.subscribe(
      params => {
        this.requestKey = params['key'];

        console.log(this.requestKey, "request")
      });
    if (this.requestKey != undefined) {

      this.getdata();
      this.requestkeyerror = false;
    }
    else {

      this.Loader1 = false;
      this.requestkeyerror = true;
    }
  }

  getdata() {

    this.service.getdata(this.requestKey).subscribe(res => {
      this.response1 = res;
      if (this.response1.Data == 0) {
        this.Loader1 = false;
        this.requestkeyerror = true;
        console.log("error234")
      } else {
        // if (this.response1.Status.Data != 0) {

        this.Loader1 = false;
        // console.log(this.response1.Status)
        sessionStorage.setItem('Status', this.response1.Status)
        sessionStorage.setItem('Dealerid', this.response1.Data.Dealer_ID)
        // console.log(this.response1.Data.Dealer_ID)
        sessionStorage.setItem('Calback', this.response1.Data.Callback_URL)
        sessionStorage.setItem('ApplictionId', this.response1.Data.Application_ID)

        sessionStorage.setItem('DeviceName', this.response1.Data.Device_Details.Device_Name)
        sessionStorage.setItem('DeviceType', this.response1.Data.Device_Details.Device_Type)
        sessionStorage.setItem("DeviceStorage", this.response1.Data.Device_Details.Device_Storage)
        sessionStorage.setItem("DeviceColor", this.response1.Data.Device_Details.Device_Color)
        // console.log(this.response1.Data.Device_Details.Device_Type)
        sessionStorage.setItem('DeviceModel', this.response1.Data.Device_Details.Device_Model_Number)
        sessionStorage.setItem('DeviceCode', this.response1.Data.Device_Details.Device_Code)
        sessionStorage.setItem('DeviceDescription', this.response1.Data.Device_Details.Device_Description)
        sessionStorage.setItem('DevicePrice', this.response1.Data.Device_Details.Device_Price)
        this.downpayment = this.response1.Data.Device_Details.Device_Price
        sessionStorage.setItem('DeviceImage', this.response1.Data.Device_Details.Device_Image_URL)
        sessionStorage.setItem('WarrentyName', this.response1.Data.Warranty_Plan.Name)
        // console.log(this.response1.Data.Warranty_Plan.Name)
        sessionStorage.setItem('WarrentyDes', this.response1.Data.Warranty_Plan.Description)
        sessionStorage.setItem('WarrentyPrice', this.response1.Data.Warranty_Plan.Price)
        sessionStorage.setItem('WarrentyTenor', this.response1.Data.Warranty_Plan.Tenor)
        sessionStorage.setItem('WarrentyImage', this.response1.Data.Warranty_Plan.Image_URL)
        // console.log(this.response1, "Response")

        this.requestkeyerror = false;
        console.log('success')
      }
      // if (this.response1.Data == 0) {
      //   this.Loader1 = false;
      //   this.requestkeyerror = true;
      //   console.log("error234")
      // }
    }, (error) => {
      console.log(error)
      this.Loader1 = false;
      this.requestkeyerror = true;

    }
    )


  }
  errorresponse: any
  initForm(): void {
    const panRegex = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;
    this.PanForm = this.formBuilder.group({
      PanNumber: ['', [Validators.required], [Validators.minLength(10), Validators.maxLength(10), Validators.pattern(panRegex)]]
    });
  }

  FirstPan: boolean = true;
  secondscreen: boolean = false;
  CustomerID: any;
  CustomerName: any;
  showbutton: boolean = false;
  showValidatebutton: boolean = false;
  RemovePan(event: any) {
    console.log(event)
    this.showbutton = true;
    this.showbutton2 = false

  }

  ShowValidatebtn(event: any) {
    console.log(event)
    this.showValidatebutton = true;
  }
  showbutton2: boolean = false;
  fetchButton() {
    this.isDisabled1 = true;
    this.Loader1 = true;
    this.pan = this.PanNumber.toUpperCase();
    sessionStorage.setItem("PanNumber", this.pan);
    if (this.pan == '' && this.response1.Data.Dealer_ID == '' && this.response1.Data.Application_ID == '') {
      this.Loader1 = false;
      this.Error = true;
      this.isDisabled1 = false;
      this.error = 'Pan Feild Required!'

    } else {

      this.Loader1 = true;

      this.service.getCustomerID(this.pan, this.response1.Data.Dealer_ID, this.response1.Data.Application_ID).subscribe(res => {
        this.response = res;
        if (this.response.status == 402) {
          this.Loader1 = false;
          this.Error = true;
          this.error = this.response.error;
          this.isDisabled1 = false

        }
        if (this.response.status == 504) {
          this.Loader1 = false;
          this.Error = true;
          this.error = this.response.error;
          this.isDisabled1 = false

        }
        this.CustomerName = this.response.Data.Customer_Name;
        this.CustomerID = this.response.Data.Customer_ID;
        console.log(this.CustomerName, "customerNAme");
        console.log(this.CustomerID, "customerid");
        sessionStorage.setItem("CustomerId", this.CustomerID);
        sessionStorage.setItem("CustomerName", this.CustomerName);
        // if (this.response.status == 200) {

        // } else {
        //   this.Loader1 = false;
        //   this.error = this.response.error
        // }

        // if (this.response.Status == 200 || this.response.Status.Data.Customer_Name !== undefined ) {
        if (this.CustomerName !== undefined) {
          this.Loader1 = false;
          this.Error = false;
          this.secondscreen = true;
          this.FirstPan = false;
          this.checked = false;
          this.showbutton2 = true
          this.showbutton = false
          this.pan1 = sessionStorage.getItem("PanNumber");

          // this.PanForm.patchValue({
          //   PanNumber: sessionStorage.getItem("PanNumber")
          // })
          // this.router.navigate(['retailer-mobile'])
        }

        else {
          this.Loader1 = false;
          this.FirstPan = true;
          this.secondscreen = false;
          this.isDisabled1 = false;
          this.Error = true;
          this.error = 'Please enter valid PAN number!'
          this.Errorexit = true;
        }

      }, (error) => {
        console.log(error)
        this.Loader1 = false;
        this.Error = true;
        this.error = "Technical Error"
        // this.requestkeyerror = true;

      });
    }

  }
  exit() {
    this.service.Exit(this.response1.Data.Application_ID, "Exit_From_PAN_Screen", "Gracefull_Exit", "Peeyush", "9890390000",
      "lorem@gmail.com", "101, SV Road", "Opp. Govt. Hospital", "Maharashtra", "400001", 'APTEST04G', "HDTEST BANK", "14361", "9 months", "10392").subscribe(res => {
        this.ExitResponse = res;
        if (this.ExitResponse.status == 200) {
          this.Callback();

        }
        //  if(this.error = 'Please enter valid PAN number!'){
        //     this.service.CallBack(this.response1.Data.Application_ID,"Invalid_PAN").subscribe(response => {
        //       this.Response1 = response;
        //       this.Response2= this.Response1['data']
        //       console.log(this.Response2)
        //       // this.RedirectCallback=this.response1.Data.Callback_URL
        //       this.RedirectCallback = this.response1.Data.Callback_URL
        //       console.log(this.Response1, "Callback response")

        //       // Router.navigate( this.RedirectCallback)
        //       // window.location.href = 'https://dmifinance.in/affordability/callback/?applicationId=&status=exit'
        //       this.redirection = this.response1.Data.Callback_URL + '/affordability/callback?applicationId=' + this.response1.Data.Application_ID + '&status=exit'
        //       console.log(this.redirection, "redir")
        //       // window.location.href=this.redirection;
        //     })
        //   }


        // if(this.ExitResponse.status==404){
        //   this.Callback();
        // }


      }, (error) => {
        console.log(error)
        this.Callback();

      })
  }
  Response1: any;
  redirection: any
  Response2: any
  Baseurl = environment.baseurl;

  res: any

  Callback() {
    // this.RedirectCallback = this.response1.Data.Callback_URL
    // console.log(this.Response1, "Callback response")
    // this.redirection = this.response1.Data.Callback_URL + '/affordability/callback?applicationId=' + this.response1.Data.Application_ID + '&status=exit'
    // console.log(this.redirection, "redir")
    // // window.location.href=this.redirection;
    // const body={
    //   Application_ID:this.response1.Data.Application_ID, 
    //   Status:'Exit'
    // }
    // this.http.post(this.Baseurl + 'Callback_URL',body, {
    //   headers: new HttpHeaders({
    //     'x-host': 'anuspam',


    //   })
    // }).subscribe(() => window.location.href=this.redirection)
    this.service.CallBack(this.response1.Data.Application_ID, "Exit").subscribe(response => {
      this.Response1 = response;

      console.log(this.Response2)
      // this.RedirectCallback=this.response1.Data.Callback_URL
      this.RedirectCallback = this.response1.Data.Callback_URL
      console.log(this.Response1, "Callback response")

      this.redirection = this.response1.Data.Callback_URL + '/affordability/callback?applicationId=' + this.response1.Data.Application_ID + '&status=exit'
      console.log(this.redirection, "redir")
      window.location.href = this.redirection;
    })



  }
  Errorexit: boolean = false;
  RedirectCallback: any
  pan1: any;
  ExitResponse: any
  exit1() {

    console.log(" djbdklnl")
    this.service.Exit(this.response1.Data.Application_ID, "Exit_From_PAN_Screen", "Invalid_PAN", "Peeyush", "9890390000",
      "lorem@gmail.com", "101, SV Road", "Opp. Govt. Hospital", "Maharashtra", "400001", this.pan1, "HDTEST BANK", "14361", "9 months", "10392").subscribe(res => {
        this.ExitResponse = res;
        if (this.ExitResponse.status == 200) {
          this.Callback();

        }

      }, (error) => {
        console.log(error)
        if (this.error = 'Please enter valid PAN number!') {
          this.service.CallBack(this.response1.Data.Application_ID, 'Exit').subscribe(response => {
            this.Response1 = response;
            this.Response2 = this.Response1['data']
            console.log(this.Response2)
            // this.RedirectCallback=this.response1.Data.Callback_URL
            this.RedirectCallback = this.response1.Data.Callback_URL
            console.log(this.Response1, "Callback response")

            this.redirection = this.response1.Data.Callback_URL + '/affordability/callback?applicationId=' + this.response1.Data.Application_ID + '&status=exit'
            console.log(this.redirection, "redir")
            // window.location.href=this.redirection;
          })
        }

      })
  }
  fetchButton1() {

    // this.pan = sessionStorage.getItem("PanNumber");
    this.FirstPan = false;

    // this.PanForm.patchValue({
    //   PanNumber: sessionStorage.getItem("PanNumber")
    // })

    this.router.navigate(['retailer-mobile'])
  }
}


