import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Validators, FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { HttpService } from 'src/app/Services/http.service';

@Component({
  selector: 'app-address-one',
  templateUrl: './address-one.component.html',
  styleUrls: ['./address-one.component.scss']
})
export class AddressOneComponent implements OnInit {
  street: any;
  state: any;
  pincode: any;
  postOffice1: any;
  LDS_decision: any;
  mandate_decision: any;
  ldsresponse: any;

  constructor(private router: Router,
    private service: HttpService,
    private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute) { }
  Pin: any;
  Loader1: boolean = false;
  Pincode: any;
  residenceForm!: FormGroup;
  CustomerID: any;
  pan: any;
  mobile: any
  ApplicationId: any
  Customer_name: any;
  Callback_url: any
  Email: any
  Pin1: any
  pincodematch: boolean = false
  ngOnInit(): void {

    this.pan = sessionStorage.getItem("PanNumber");
    this.mobile = sessionStorage.getItem('Mobile');
    this.ApplicationId = sessionStorage.getItem('ApplictionId')
    this.Customer_name = sessionStorage.getItem("CustomerName");
    this.Callback_url = sessionStorage.getItem('Calback');
    this.Pin1 = sessionStorage.getItem('PIN')
    this.Email = sessionStorage.getItem("Email")

    this.flat = sessionStorage.getItem('Street');
    // this.landmark = sessionStorage.getItem('landmark')
    this.postOffice = sessionStorage.getItem('Post_Office');
    this.District = sessionStorage.getItem('District');
    this.Pincode = sessionStorage.getItem('Pincode');
    this.State = sessionStorage.getItem('State');

    this.CustomerID = sessionStorage.getItem("CustomerId");
    this.residenceForm = this.formBuilder.group({

      landmark: new FormControl('', Validators.required),
      flat: new FormControl('', Validators.required),
      postOffice: new FormControl('', Validators.required),
      District: new FormControl('', Validators.required),
      Pincode: new FormControl('', Validators.required),
      State: new FormControl('', Validators.required),
    });

    this.residenceForm.patchValue({
      flat: sessionStorage.getItem('Street'),
      // landmark: sessionStorage.getItem('landmark') || "",
      landmark: "",
      postOffice: sessionStorage.getItem('Post_Office'),
      District: sessionStorage.getItem('District'),
      Pincode: sessionStorage.getItem('Pincode'),
      State: sessionStorage.getItem('State'),
    })
    if (this.Pin1 != this.Pincode) {
      this.pincodematch = true;
    }

  }
  checkDmiKYCWindowInterval: any;
  dynamicURL: any;
  isKYCReject: any;
  dmiKYCWindow!: Window | null;
  flat: any;
  postOffice: any;
  District: any;
  State: any;
  landmark: any;
  response: any;
  isDisabled1: boolean = false;


  submit() {
    this.Loader1 = true;
    this.isDisabled1 = true;
    this.landmark = this.residenceForm.get('landmark')?.value;
    this.postOffice1 = this.residenceForm.get('postOffice')?.value;
    console.log(this.landmark, "dfghjkl");

    this.street = this.residenceForm.get('flat')?.value;
    this.District = this.residenceForm.get('District')?.value;
    this.state = this.residenceForm.get('State')?.value;
    this.pincode = this.residenceForm.get('Pincode')?.value;
    this.service.UpdateAddress(this.CustomerID, this.street, this.landmark, this.postOffice1, this.District, this.state, this.pincode).subscribe(res => {
      this.response = res;
      console.log(res, "residence")
      // && this.response.Data.Lead_Address_Offer_Update_Status == 204
      if (this.response.Data.Contact_Address_Update_Status == 204 && this.response.Data.Lead_Address_Offer_Update_Status == 204) {

        this.checkcallbackstatus()
        // this.service.getKYCurl(this.CustomerID, 'LDS').subscribe(res => {

        //   this.ldsresponse = res.Data.Request_Key;
        //   sessionStorage.setItem('requestKey', this.ldsresponse)
        //   console.log(this.ldsresponse, "ldsresponse")
        //   this.Loader1 = false;
        //   this.router.navigate(['/Lds-page']);
        // })


      }
      else {
        this.Loader1 = false;
        this.isDisabled1 = false;
        console.log("error")
      }

    })

  }
  checkIfDmiKycClosed() {
    if (this.dmiKYCWindow?.closed) {
      clearInterval(this.checkDmiKYCWindowInterval);
    }
  }
  CITY: any;
  STATE: any;


  onpinchange(Pincode: any) {
    this.service.getPincodeDetails(Pincode).subscribe(res => {
      this.response = res.data.Pincode;
      console.log(this.response)
      this.CITY = res['data'].City;
      this.STATE = (res['data'].State);
      if (this.Pin1 == this.response) {
        this.pincodematch = false;
      }
      else {
        this.pincodematch = true;
      }
      this.residenceForm.patchValue({
        'District': this.CITY,
        'State': this.STATE

      })

    });



  }

  // -----------------lds callback------------------

  redyforconversion: any
  // ------Emandate-callback--------------------------------------
  checkcallbackstatus() {

    this.service.checkcallback(this.CustomerID).subscribe(res => {

      this.mandate_decision = res.Data
      this.redyforconversion = res.Data.Ready_For_Conversion;
      if (this.redyforconversion == 'Yes') {
        if (this.mandate_decision.Opportunity_ID != '' && this.mandate_decision.Pre_Delivery_Order != '') {

          this.service.getKYCurl(this.CustomerID, 'LDS').subscribe(res => {

            this.ldsresponse = res.Data.Request_Key;
            sessionStorage.setItem('requestKey', this.ldsresponse)
            console.log(this.ldsresponse, "ldsresponse")
            this.Loader1 = false;
            this.router.navigate(['/Lds-page']);
          })

        }
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

          this.isDisabled1 = false
          this.Loader1 = false
          this.count = 0;

        }
        return;
      }

    });
  }
  count: number = 0;
  count1: number = 0;


  // ----------------------------Adress-check-required---------------
  responseAdress: any;
  AddressRequired: any;
  Addresscheckpin() {

    this.service.checkcallback(this.CustomerID).subscribe(res => {
      this.responseAdress = res.Data
      this.AddressRequired = this.responseAdress.Address_Required
      console.log(this.AddressRequired, "Address")
      if (this.AddressRequired == 'Yes') {
        this.pincodematch = true;
        return
      }
      if (this.AddressRequired == 'No') {
        this.pincodematch = false;
        return
      }



      else {
        this.count1 += 1;
        // console.log(this.count,'count');
        if (this.count1 <= 50) {
          setTimeout(() => {
            this.checkcallbackstatus();

          }, 4000);

        }
        else {

          this.isDisabled1 = false
          this.Loader1 = false
          this.count1 = 0;

        }
        return;
      }

    });
  }
  

  // ------------------------------------------End-------------

  ExitResponse: any
  exit() {
    this.service.Exit(this.ApplicationId, "Exit_From_Address_Screen", "Gracefull_Exit", this.Customer_name, this.mobile,
      this.Email, "101, SV Road", "Opp. Govt. Hospital", "Maharashtra", this.Pin, this.pan, "HDTEST BANK", "14361", "9 months", "10392").subscribe(res => {
        this.ExitResponse = res;
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
