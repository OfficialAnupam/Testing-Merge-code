import { Component, OnDestroy, OnInit } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Validators, FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { HttpService } from 'src/app/Services/http.service';

@Component({
  selector: 'app-account-agreegator-page',
  templateUrl: './account-agreegator-page.component.html',
  styleUrls: ['./account-agreegator-page.component.scss']
})
export class AccountAgreegatorPageComponent implements OnInit {

  constructor(private router: Router,
    private service: HttpService, private device: DeviceDetectorService,
    private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute) {
    // this.myForm();
  }

  Company: string = '';
  company: any;
  CustomerID: any;
  isDisabled2: boolean = false;
  Mobile: any;
  EmploymentDetail: any
  CustomerName: any
  pan: any;
  mobile: any
  ApplicationId: any
  Customer_name: any;
  Callback_url: any
  Email: any
  Pin: any
  modelView: boolean = false;

  ngOnInit(): void {
    this.pan = sessionStorage.getItem("PanNumber");
    this.mobile = sessionStorage.getItem('Mobile');
    this.ApplicationId = sessionStorage.getItem('ApplictionId')
    this.Customer_name = sessionStorage.getItem("CustomerName");
    this.Callback_url = sessionStorage.getItem('Calback');
    this.Pin = sessionStorage.getItem('PIN')
    this.Email = sessionStorage.getItem("Email")

    this.CustomerID = sessionStorage.getItem("CustomerId");
    this.Mobile = sessionStorage.getItem("Mobile")
    this.EmploymentDetail = sessionStorage.getItem('EmploymentDetail')
    this.LeadId = sessionStorage.getItem('LeadID')
    this.contactid = sessionStorage.getItem('ContactID')
    this.CustomerName = sessionStorage.getItem("CustomerName");
    this.email = sessionStorage.getItem("Email")
    this.checkcallbackstatus()
  }
  email: any
  LeadId: any;
  contactid: any
  response: any;
  Loader1: boolean = false;
  errorMessage: any;

  buttonhide: boolean = false;
  AAwithout() {
    this.modelView = true;
  }

  ModelClose() {
    this.modelView = false;
  }
  ExitModel() {
    this.exit();
  }
  continueFour() {
    this.isDisabled2 = true;
    this.Loader1 = true;

    this.service.ReadyForDecision(this.CustomerID).subscribe(res => {
      this.response = res;
      this.isDisabled2 = false;
      // console.log(this.response.Status, "")
      if (this.response.Data == 204) {
        this.router.navigate(['/check-offer'])
        // this.checkcallbackstatus1();


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

  // ----------------------Count-Message------------------------
  showTimer: boolean = false;
  interval: any;
  Status: any
  timeLeft: any;
  resendtimer: boolean = false
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
        this.timeLeft = 120;
        this.resendtimer = true;
        this.showTimer = false;


      }

    }, 1000)
    this.timeLeft = 120;
    this.showTimer = true;
    this.resendtimer = true;
   
  }



  // ---------------------------------------------- End-Message--------


  Cancel() {
    // this.Loader1=true;
    // this.router.navigate(['emi-offer'])

  }
  AA_check: any
  ReadyDecision: any;
  ErrorAA: boolean = false;

  checkcallbackstatus() {
    this.Loader1 = true;
    this.service.checkcallback(this.CustomerID).subscribe(res => {
      this.offercallback = res.Data.Offer_Decision;
      this.AA_check = res.Data.AA_Status;
      this.ReadyDecision = res.Data.Ready_For_Decision;
      if (this.AA_check == 'Success') {
        this.service.ReadyForDecision(this.CustomerID).subscribe(res => {
          this.response = res;
          this.isDisabled2 = false;
          // console.log(this.response.Status, "")
          if (this.response.Data == 204) {
            this.Loader1 = false;
            this.router.navigate(['/check-offer'])

          } else {

            this.Loader1 = false;
            this.isDisabled2 = false;
            this.errorMessage = "Sorry! rejected your application.";

          }


        }, (error) => {
          console.error('error caught in component')
          this.errorMessage = "Technical Error";
          this.Loader1 = false;

        })
        return;

      }
      if (this.AA_check == 'Failed') {
        this.Loader1 = false;
        this.ErrorAA = true
        this.error = 'Sorry! Digital acquisition of bank account statement is failed.';
        // this.router.navigate(['/emi-offer'])

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
          this.Error = true;
          this.error = 'Technical Error';
        }
        return;
      }


    });
  }
  Error: boolean = false;
  error: any;
  count: number = 0;
  count1: number = 0;
  offercallback: any;

  // checkcallbackstatus1() {
  //   this.Loader1 = true;
  //   this.service.checkcallback(this.CustomerID).subscribe(res => {
  //     console.log(res);
  //     // this.Loader1=true;
  //     this.offercallback = res.Data.Offer_Decision;
  //     this.AA_check = res.Data.AA_Status;
  //     this.ReadyDecision = res.Data.Ready_For_Decision;
  //     // this.count = 0;
  //     //   this.router.navigate(['/emi-offer'])
  //     if (this.offercallback == 'PreApproved') {
  //       this.Loader1 = false;
  //       // this.count = 0;

  //       // .then(() => {
  //       //   window.location.reload();});
  //       return;
  //     }

  //     else {
  //       this.count1 += 1;
  //       // console.log(this.count,'count');
  //       if (this.count1 <= 50) {
  //         setTimeout(() => {
  //           this.checkcallbackstatus1();

  //         }, 4000);

  //       }
  //       else {

  //         this.Loader1 = false;

  //         this.count1 = 0;

  //         this.Error = true;
  //         this.error = 'Technical Error';
  //       }
  //       return;
  //     }


  //   });
  // }



  AAResponse: any
  AAUrl: any;
  response1: any;

  AAfailed() {
    this.Loader1 = true;
    this.startTimer()
    this.service.getKYCurl(this.CustomerID, 'AA').subscribe(res => {
      this.response1 = res
      console.log(this.response1, "AAService")
      this.AAUrl = this.response1['Data'];
      console.log(this.AAUrl, "AAurl")
    }, (error) => {
      console.error('error caught in component')
      this.ErrorAA = true;
      this.error = 'Technical Error'
      this.Loader1 = false;

    })
  }

  ExitResponse: any
  exit() {
    this.service.Exit(this.ApplicationId, "Exit_From_AA_Screen", "Gracefull_Exit", this.Customer_name, this.mobile,
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


