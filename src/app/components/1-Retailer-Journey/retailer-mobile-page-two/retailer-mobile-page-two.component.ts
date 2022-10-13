import { Component, OnInit } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Validators, FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { HttpService } from 'src/app/Services/http.service';

@Component({
  selector: 'app-retailer-mobile-page-two',
  templateUrl: './retailer-mobile-page-two.component.html',
  styleUrls: ['./retailer-mobile-page-two.component.scss']
})
export class RetailerMobilePageTwoComponent implements OnInit {

  constructor(private router: Router,
    private service: HttpService, private device: DeviceDetectorService,
    private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute) {
    this.myForm();
  }
  pan: any
  ApplicationId: any
  Callback_url: any
  ngOnInit(): void {
    this.CustomerID = sessionStorage.getItem("CustomerId");
    this.pan = sessionStorage.getItem("PanNumber");
    this.ApplicationId = sessionStorage.getItem('ApplictionId');
    this.Callback_url = sessionStorage.getItem('Calback');
    this.myForm();
  }
  submitted = false;
  MobileNumber: any;
  mobile: any;
  AlternativeNumber: any;
  Loader1: boolean = false;
  Proceed: boolean = false;
  errorMobile: boolean = false;
  Error: any;
  CustomerID: any;
  respnose: any;
  MobileForm: any;

  get f() {
    return this.MobileForm.controls;
  }

  deviceinfo: any
  deviceType: any;
  Device_Info: any
  async deviceTrack() {


    let info = this.device.getDeviceInfo();
    let deviceType: string;

    if (info) {

      if (this.device.isMobile()) { deviceType = 'Mobile' }
      else if (this.device.isTablet()) { deviceType = 'Tablet' }
      else if (this.device.isDesktop()) { deviceType = 'Desktop' }

      let latLong: any;


      try {
        const response = await this.getCurrentLatLong();
        latLong = response;

      }
      catch (error) {
        latLong = error;
      }
      this.mobile = sessionStorage.getItem('Mobile');
      this.Device_Info = this.device.deviceType,
        this.deviceinfo = this.Device_Info.charAt(0).toUpperCase() + this.Device_Info.slice(1);
      this.Device_Version = this.device.os_version.charAt(0).toUpperCase() + this.device.os_version.slice(1);

      this.service.getDeviceTrack('', '', this.mobile, this.deviceinfo, this.device.browser, this.Device_Version, this.device.os, this.device.browser_version, latLong.longitude, latLong.latitude, 'Null', 'Apple').subscribe();

    }

  }

  Device_Version: any;
  getCurrentLatLong(): Promise<any> {

    return new Promise((resolve, reject) => {

      navigator.geolocation.getCurrentPosition(resp => {
        resolve({ longitude: resp.coords.longitude, latitude: resp.coords.latitude });


      },
        err => {
          console.log(err)
          reject({ longitude: '', latitude: '' });

        });

    });

  }

  AlternativeMobile: any;
  myForm() {
    this.MobileForm = this.formBuilder.group({
      Mobilenumber: new FormControl('', [Validators.required, Validators.minLength(10),
      Validators.maxLength(10)]),
      AlternativeNumber: new FormControl('')
    });
  }
  ExitResponse: any
  exit() {

    this.service.Exit(this.ApplicationId, "Exit_From_Mobile_Screen", "Gracefull_Exit", "Peeyush", "9890390000",
      "lorem@gmail.com", "101, SV Road", "Opp. Govt. Hospital", "Maharashtra", "400001", this.pan, "HDTEST BANK", "14361", "9 months", "10392").subscribe(res => {
        this.ExitResponse = res;
        console.log(this.ExitResponse.status)
        if (this.ExitResponse.status == 200) {
          this.Callback();

        }

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

      console.log(this.Response2)

      this.RedirectCallback = this.Callback_url
      console.log(this.Response1, "Callback response")

      this.redirection = this.RedirectCallback + '/affordability/callback?applicationId=' + this.response1.Data.Application_ID + '&status=exit'
      console.log(this.redirection, "redir")
      window.location.href = this.redirection;
    })
  }

  continueEligible() {
    this.Loader1 = true;
    this.mobile = this.MobileNumber;
    sessionStorage.setItem("Mobile", this.mobile)
    this.AlternativeMobile = this.AlternativeNumber || '';
    let stringMob = this.MobileNumber.toString()
    // if(stringMob.length == ''){
    //   this.errorMobile = true;
    //   this.Error = "Please enter valid Mobile Number"
    // }

    if ((stringMob.length < 10) || (stringMob.length > 10)) {
      this.Loader1 = false;
      this.errorMobile = true;
      this.Error = "Please enter valid 10 digit Mobile Number"
      // this.hide = false;

    }

    if (this.mobile > 10) {
      this.Loader1 = false;
      this.errorMobile = true;
      this.Error = "Please enter valid 10 digit Mobile Number"

    }
    if (this.mobile.length === 10) {
      this.Proceed = true;
      this.Loader1 = true;
      this.service.CheckMobile(sessionStorage.getItem("CustomerId"), this.mobile).subscribe(res => {
        this.respnose = res;


        console.log(this.respnose.Data.Message)
        sessionStorage.setItem('Message', this.respnose.Data.Message)
        // this.router.navigate(['employment-two'])
        console.log(this.respnose.Data.Eligibility_Status, 'dfghjkl;')

        this.checkcallbackstatus();
      })


    }


  }

  response1: any
  sendotp() {
    this.Loader1 = true;
    this.service.sendOTP(this.mobile).subscribe(res => {

      this.response1 = res;

      console.log(res, "send")

      // this.service.getEventTrack('', this.mobile, 'OTP Send', 'API', 'Frontend', 'Apple', this.Mobile, '', '', '', '').subscribe(res => {

      // });
      // this.deviceTrack()
      // this.router.navigate(['/retailer-otp'])
      // this.deviceTrack();
    });
  }
  numberOnly(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
  checkDataResponse: any
  checkcallbackstatus() {
    this.Loader1 = true
    this.service.checkcallback(this.CustomerID).subscribe(res => {
      this.checkDataResponse = res.Data;
      console.log(this.checkDataResponse, "response")

      if (this.checkDataResponse.OTP_Required == 'No') {
        this.deviceTrack();
        this.Loader1 = false;
        this.router.navigate(['/employment-two']);
        // this.router.navigate(['/retailer-otp']);

      }
      else if (this.checkDataResponse.OTP_Required == 'Yes') {

        this.Loader1 = false;
        this.sendotp()
        this.router.navigate(['/retailer-otp']);


        return;
      }

      else {
        this.count += 1;

        if (this.count <= 50) {
          setTimeout(() => {
            this.checkcallbackstatus();

          }, 4000);
        }
        else {
          this.Loader1 = false;


          this.count = 0;

        }

        return;
      }

    });
    // , err => {
    //   setTimeout(() => {
    //     this.checkcallbackstatus3();
    //   }, 5000);

    //   return;
    // }

  }
  count: number = 0;
}
