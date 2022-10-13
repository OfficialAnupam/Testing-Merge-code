import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/Services/http.service';

@Component({
  selector: 'app-loan-senctioned-page-one',
  templateUrl: './loan-senctioned-page-one.component.html',
  styleUrls: ['./loan-senctioned-page-one.component.scss']
})
export class LoanSenctionedPageOneComponent implements OnInit {

  constructor(private router: Router, private service: HttpService) { }

  isDisabled: boolean = false;
  downpayment: any;
  processingfee: any;
  totalamount: any;
  EmiAmount: any;
  Tenor: any;
  CustomerID: any;
  Loader1: boolean = false;
  // showPreDelivery=false;
  Dealerid: any
  Applictionid: any;
  DeviceName: any
  Devicetype: any
  Devicemodel: any;
  Devicecode: any;
  Devicedescription: any;
  Deviceprice: any;
  Deviceimage: any;
  Warrentyname: any;
  Warrentydes: any;
  Warrentyprice: any;
  Warrentytenor: any;
  Warrentyimage: any;
  PreDoURL: any;
  isDisabled1: boolean = false;
  AdditionalDownpayment: any;
  SchemeDownpayment: any;
  Scheme: any;
  LoanAmount: any;
  totalamount1: any;
  DeviceStorage: any
  DeviceColor: any
  pan: any;
  mobile: any
  ApplicationId: any
  Customer_name: any;
  Callback_url: any
  Email: any
  Pin: any
  ngOnInit(): void {

    this.pan = sessionStorage.getItem("PanNumber");
    this.mobile = sessionStorage.getItem('Mobile');
    this.ApplicationId = sessionStorage.getItem('ApplictionId')
    this.Customer_name = sessionStorage.getItem("CustomerName");
    this.Callback_url = sessionStorage.getItem('Calback');
    this.Pin = sessionStorage.getItem('PIN')
    this.Email = sessionStorage.getItem("Email")
    // ------------------------------------------------------------
    this.CustomerID = sessionStorage.getItem("CustomerId");
    this.PreDoURL = sessionStorage.getItem('preDoUrl');
    console.log(this.PreDoURL, "PreDoURL")
    this.AdditionalDownpayment = sessionStorage.getItem('AdditionalDownpayment')
    this.SchemeDownpayment = sessionStorage.getItem('SchemeDownpayment')
    this.Scheme = sessionStorage.getItem('Scheme')
    this.processingfee = sessionStorage.getItem('processingfee')
    this.EmiAmount = sessionStorage.getItem('EMIAmount')
    this.LoanAmount = sessionStorage.getItem('LoanAmount')
    this.Tenor = sessionStorage.getItem('Tenor')
    this.DeviceStorage = sessionStorage.getItem("DeviceStorage")
    this.DeviceColor = sessionStorage.getItem("DeviceColor")
    this.totalamount1 = parseInt(this.AdditionalDownpayment) + parseInt(this.SchemeDownpayment) + parseInt(this.processingfee)
    sessionStorage.setItem('TotalAmount1', this.totalamount1)
    // ---------------------------------------------------------------
    this.Dealerid = sessionStorage.getItem('Dealerid')
    console.log(this.Dealerid)
    sessionStorage.getItem('Calback')
    this.Applictionid = sessionStorage.getItem('ApplictionId')
    this.DeviceName = sessionStorage.getItem('DeviceName')
    console.log(this.DeviceName, "device")
    this.Devicetype = sessionStorage.getItem('DeviceType')
    console.log(this.Devicetype)
    this.Devicemodel = sessionStorage.getItem('DeviceModel')
    this.Devicecode = sessionStorage.getItem('DeviceCode')
    this.Devicedescription = sessionStorage.getItem('DeviceDescription')
    this.Deviceprice = sessionStorage.getItem('DevicePrice')
    this.Deviceimage = sessionStorage.getItem('DeviceImage')
    this.Warrentyname = sessionStorage.getItem('WarrentyName')

    this.Warrentydes = sessionStorage.getItem('WarrentyDes')
    this.Warrentyprice = sessionStorage.getItem('WarrentyPrice')
    this.Warrentytenor = sessionStorage.getItem('WarrentyTenor')
    this.Warrentyimage = sessionStorage.getItem('WarrentyImage')
    if (this.Deviceimage == '') {
      this.Imagehide = true;
      // this.Imagehide = !this.Imagehide
    }
    if (this.Warrentyimage == '') {
      this.WarrentyimageHide = true;
      // this.Imagehide = !this.Imagehide
    }
  }

  Imagehide: boolean = false;
  WarrentyimageHide: boolean = false
  response: any;
  showPreDo: any;
  isDisabled2: boolean = false;
  showPreDelivery() {
    // this.Loader1 = true;
    // this.isDisabled1 = true;
    window.open(this.PreDoURL, '_blank');
    // this.service.GetpreDo(this.CustomerID).subscribe(response => {
    //   this.showPreDo = response;
    //   console.log(this.showPreDo)

    //   console.log(this.showPreDo.Data[0].URL, "dfghjkl;'")
    // })
    // this.checkcallbackstatus()
  }


  procceed() {
    this.Loader1 = true;
    this.isDisabled2 = true;
    this.service.GetPayment(this.CustomerID, "1").subscribe(res => {
      // this.Loader1 = false;
      console.log(res, "asdc");
      this.response = res.Data;
      if (this.response == true) {
        this.checkcallbackstatus1();
      }
      else {
        this.Loader1 = false
        console.log(this.response, "ghjk")
      }

      // this.router.navigate(['/loan-senction-two'])
    })

  }
  predo: any;
  count: any
  count1: any
  checkcallbackstatus() {
    this.Loader1 = true;
    this.service.checkcallback(this.CustomerID).subscribe(res => {
      console.log(res);
      // this.Loader1=true;
      this.predo = res.Data.Pre_Delivery_Order;

      console.log(this.predo, '')

      if (this.predo != '') {
        this.Loader1 = false;
        window.open(this.predo, '_blank');

        // this.router.navigate(['emi-offer'])
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
          this.isDisabled = false;
          this.Loader1 = false
          this.count = 0;

        }
        return;
      }


    });
  }

  downpaymentCollected: any;
  checkcallbackstatus1() {
    this.Loader1 = true;
    this.service.checkcallback(this.CustomerID).subscribe(res => {
      console.log(res);
      // this.Loader1=true;
      this.downpaymentCollected = res['Data'].Down_Payment_Collected;

      console.log(this.downpaymentCollected, 'dowwnpayemt')

      if (this.downpaymentCollected != '') {
        this.Loader1 = false;
        this.router.navigate(['/loan-senction-two'])
        // this.router.navigate(['emi-offer'])
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
          this.isDisabled = false;
          this.Loader1 = false
          this.count1 = 0;

        }
        return;
      }


    });
  }

  ExitResponse: any
  exit() {
    this.service.Exit(this.ApplicationId, "Exit_From_Loan_Sanctioned_Screen", "Gracefull_Exit", this.Customer_name, this.mobile,
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

    this.service.CallBack(this.ApplicationId, "Exit").subscribe(response => {
      this.Response1 = response;
      this.Response2 = this.Response1['data'][0]
      console.log(this.Response2)
      // this.RedirectCallback=this.response1.Data.Callback_URL
      this.RedirectCallback = this.Callback_url
      console.log(this.Response1, "Callback response")

      this.redirection = this.Callback_url + '/affordability/callback?applicationId=' + this.ApplicationId + '&status=exit'
      console.log(this.redirection, "redir")
      window.location.href = this.redirection;
    })
  }
}
