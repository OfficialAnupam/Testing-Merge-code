import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Validators, FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { HttpService } from 'src/app/Services/http.service';

@Component({
  selector: 'app-kyc-veification-one',
  templateUrl: './kyc-veification-one.component.html',
  styleUrls: ['./kyc-veification-one.component.scss']
})
export class KycVeificationOneComponent implements OnInit {
  dynamicURL: any;
  isKYCReject: any;
  dmiKYCWindow!: Window | null;
  count: number = 0
  checked = false;
  constructor(private router: Router,
    private service: HttpService,
    private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute) { }
  errorKyc: any;

  KYC: string = '';
  CustomerID: any;
  isValidFormSubmitted = false;
  Loader1: boolean = false;
  Kyc: any;
  isDisabled1: boolean = false
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
  street: any;
  // dmiKYCWindow: Window;
  checkDmiKYCWindowInterval: any;
  checkcallbackstatus() {
    // this.Loader1 = true;

    this.service.checkcallback(this.CustomerID).subscribe(res => {


      this.kyc_decision_status = res.Data.KYC_Decision;
      console.log(this.kyc_decision_status, "fghjkl")


      if (this.kyc_decision_status == 'Approved') {
        // this.isDisabled = true;
        let Contact_Id = sessionStorage.getItem('Contact_id');


        this.service.GetKycCallback(this.CustomerID).subscribe(res => {

          this.kyc_decision = res['Data']
          this.Loader1 = false;
          this.street = this.kyc_decision[0].Street
          console.log(this.street, "street")
          sessionStorage.setItem('Street', this.kyc_decision[0].Street)

          sessionStorage.setItem('Post_Office', this.kyc_decision[0].Post_Office)
          sessionStorage.setItem('District', this.kyc_decision[0].District)
          sessionStorage.setItem('Pincode', this.kyc_decision[0].Pincode)
          sessionStorage.setItem('State', this.kyc_decision[0].State)
          sessionStorage.setItem('landmark', this.kyc_decision[0].landmark)

          this.router.navigate(['/address-one']);

          // this.isKYCSuccess = true;


        });


        clearInterval(this.checkDmiKYCWindowInterval);
        this.dmiKYCWindow!.close();
      }
      else if (this.kyc_decision_status == 'Rejected') {
        // this.isDisabled = true;
        this.Loader1 = false;
        this.isDisabled1 = false;
        console.log(this.isKYCReject, 'KYCREJECTED')
        this.errorKyc = "KYC Failed, Please Try Again.";
        this.Exit2 = true
        this.Exit1 = true
        this.dmiKYCWindow!.close();

      }
      else {
        // this.sendStatus.emit({status:'KycFail',value:1,response:''});
        this.count += 1;
        // console.log(this.count1, 'count');
        if (this.count <= 50) {

          setTimeout(() => {
            // this.Loader1=false
            this.checkcallbackstatus();

          }, 4000);


        }
        else {
          this.Loader1 = false;
          this.isDisabled1 = false;
          this.errorKyc = "Something went wrong. Please try after some time! ";
          this.Exit3 = true
          this.Exit1 = true
          // this.router.navigate(['/technical-error-page']);
          clearInterval(this.checkDmiKYCWindowInterval);
          this.dmiKYCWindow!.close();

          this.count = 0;

        }



      }


      // }, err => {
      //   setTimeout(() => {
      //     this.checkcallbackstatus();
      //   }, 5000);

      //   return;
    });
  }

  onFormSubmit(form: NgForm) {
    this.isDisabled1 = true;
    this.Loader1 = true;
    this.isDisabled = false;
    this.Kyc = form.controls['KYC'].value;
    console.log(this.Kyc, 'dfghjkl;');


    // this.service.getEventTrack('', this.User_Mobile, 'Proceed For KYC', 'Button', 'Frontend', 'DMI Finance', '', '', '', '', '').subscribe(res => {

    // });
    if (this.Kyc !== undefined) {
      console.log("ansbjkdbnkdnlk")
      this.isDisabled = false;
      this.isValidFormSubmitted = true;
      this.Loader1 = true
      this.service.getKYCurl(this.CustomerID, 'KYC').subscribe(res => {
        // if (res.Status == 200) {
        this.dynamicURL = res['Data'];
        // this.Loader1 = false;
        const width = screen.width * 0.62 < 400 ? 400 : screen.width * 0.62;
        const height = screen.height * 0.62;
        const left = (screen.width / 2) - (width / 2);
        const top = (screen.height / 2) - (height / 2);
        this.dmiKYCWindow = window.open(this.dynamicURL, '_blank', ',scrollbars=1,menubar=0,resizable=1,width = ' + width + ', height = ' + height + ', top = ' + top + ', left = ' + left);


        this.checkDmiKYCWindowInterval = setInterval(() => {
          this.checkIfDmiKycClosed();
        }, 300);
        // this.router.navigate(['/address-one']);
        this.checkcallbackstatus();
        // }
        // else {
        //   this.isDisabled1 = false;
        //   this.Loader1 = false;
        // }

      });
    }
    else {
      if (form.invalid) {
        this.Loader1 = false;
        this.isValidFormSubmitted = false;
        return;
      }
    }



  }

  kyc_decision: any;
  kyc_decision_status: any


  isDisabled: boolean = true;

  checkIfDmiKycClosed() {
    if (this.dmiKYCWindow?.closed) {
      this.Loader1 = false;
      this.isDisabled1 = false;
      clearInterval(this.checkDmiKYCWindowInterval);
    }
  }

  tab: any = 'tab1';
  tab1: any
  tab2: any

  step: any;
  onClick(check: any) {
    console.log(check);
    if (check == 1) {
      this.tab = 'tab1';
    } else if (check == 2) {
      this.tab = 'tab2';
    }

    //  else {
    //   this.tab = 'tab5';
    // }
  }
  Exit1: boolean = false;
  Exit2: boolean = false;
  Exit3: boolean = false;
  exit1() {
    this.service.Exit(this.ApplicationId, "KYC_Failed", "Reason - As received from policy - SFDC", this.Customer_name, this.mobile,
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
  exit2() {
    this.service.Exit(this.ApplicationId, "Technical_Error", "Technical_Error", this.Customer_name, this.mobile,
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
  ExitResponse: any
  exit() {
    this.service.Exit(this.ApplicationId, "Exit_From_KYC_Screen", "Gracefull_Exit", this.Customer_name, this.mobile,
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
