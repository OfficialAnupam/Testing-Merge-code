import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl, AbstractControl, } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { HttpService } from 'src/app/Services/http.service';


@Component({
  selector: 'app-otp-page-three',
  templateUrl: './otp-page-three.component.html',
  styleUrls: ['./otp-page-three.component.scss']
})
export class OtpPageThreeComponent implements OnInit {

  constructor(private router: Router,
    private service: HttpService,
    private device: DeviceDetectorService,
    private fb: FormBuilder, private activatedRoute: ActivatedRoute) { }
  mobile: any;
  ErrorOtp: boolean = false;
  wrongOTP: any;
  // interval: NodeJS.Timeout ;
  // inter!: NodeJS.Timeout;
  interval: any;
  config = {
    allowNumbersOnly: true,
    length: 4,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: '',
    inputStyles: {
      'border-bottom': '1px solid #b7b5b5',
      'outline': 'none',
      'border-top': 'none',
      'border-left': 'none',
      'border-right': 'none',
      'margin-bottom': '10px',
      'height': '24px'
    }
  };
  ApplicationId: any
  pan: any;
  Customer_name: any;
  Callback_url: any

  ngOnInit(): void {
    this.mobile = sessionStorage.getItem("Mobile")
    this.pan = sessionStorage.getItem("PanNumber");
    this.ApplicationId = sessionStorage.getItem('ApplictionId')
    this.Customer_name = sessionStorage.getItem("CustomerName");
    this.Callback_url = sessionStorage.getItem('Calback')
    
    this.startTimer();
  }

  Loader1: boolean = false;
  continueOTP() {
    // this.router.navigate(['pan'])
  }
  showTimer: boolean = false;
  Status: any
  timeLeft: any;
  startTimer() {
    this.showTimer = true;
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;

      }
      else if (this.timeLeft == 0) {
        this.resendtimer = false;
        this.showTimer = false;

      }

      else {
        this.timeLeft = 60;
        this.resendtimer = true;
        this.showTimer = false;


      }

    }, 1000)
    this.timeLeft = 60;
    this.showTimer = true;
    this.resendtimer = true;
    // this.resend_OTP = false;
  }

// ----------------Device-tracking-------?--
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





// ------------End-Tracking--------------------

  onOtpChange(otp: string) {


    if (otp.length == 4) {
      this.Loader1 = true;
      this.service.getverifyOTP(this.mobile, otp).subscribe(res => {

        // console.log(res, "sdfghjkl;")
        this.Status = res;
        console.log(this.Status.Status)



        if (this.Status.Status == 200) {
          // this.ErrorOtp = true;
          // this.wrongOTP = 'OTP has been verified';
          // console.log(this.Status.Status, "800")
          this.Loader1 = false;
          this.deviceTrack()
          // this.service.getEventTrack('', this.mobile, 'Verify OTP', 'API', 'Frontend', 'Apple', otp, '', '', '', '').subscribe(res => {

          // });

          setTimeout(() => {
            // this.continueOTP()
            this.router.navigate(['/employment-two'])
          }, 0);

        }
        else {
          this.Loader1 = false;
          this.ErrorOtp = true;

          this.wrongOTP = "Invalid OTP";
          // this.service.getEventTrack('', this.mobile, 'Error OTP', 'API', 'Frontend', 'Apple', otp, '', '', '', '').subscribe(res => {

          // });
          console.log(this.wrongOTP, "sdfghjkl;'")
        }
      }
        , error => {
          
            this.Loader1 = false;
            this.wrongOTP = 'Please Enter Valid OTP';

          

        });

    }
  }

  otpresponse: any;
  resendtimer: boolean = false
  ResendOtp() {
    this.startTimer();
    this.service.ResendOTP(this.mobile).subscribe(res => {

      this.otpresponse = res
      console.log(this.otpresponse)
    })
  }

  ExitResponse: any
  exit() {
    this.service.Exit(this.ApplicationId, "Exit_From_OTP_Screen", "Gracefull_Exit", this.Customer_name, this.mobile,
      "lorem@gmail.com", "101, SV Road", "Opp. Govt. Hospital", "Maharashtra", "400001", this.pan, "HDTEST BANK", "14361", "9 months", "10392").subscribe(res => {
        this.ExitResponse = res;
        if (this.ExitResponse.status == 200) {
          this.Callback();
        }
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
