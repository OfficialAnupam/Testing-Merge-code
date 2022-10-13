import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { HttpService } from 'src/app/Services/http.service';

// declare var require: any
// const FileSaver = require('file-saver');

@Component({
  selector: 'app-loan-senction-page-three',
  templateUrl: './loan-senction-page-three.component.html',
  styleUrls: ['./loan-senction-page-three.component.scss']
})
export class LoanSenctionPageThreeComponent implements OnInit {

  constructor(private router: Router, private service: HttpService) { }
  @ViewChild('Model1') private Model1: any;

  downpayment: any;
  processingfee: any;
  totalamount: any;
  EmiAmount: any;
  Tenor: any;
  CustomerID: any;
  Loader1: boolean = false;
  Model: boolean = false;
  IMEINumber: any;
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
  downpayment1: any
  processingfee1: any
  totalamount1: any
  EmiAmount1: any
  AdditionalDownpayment: any;
  SchemeDownpayment: any;
  Scheme: any;
  LoanAmount: any;
  AdditionalDownpayment1: any;
  SchemeDownpayment1: any;
  Scheme1: any;
  LoanAmount1: any;
  totalDownpayment1: any
  totalDownpayment: any
  totalDownpayment2: any
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
    this.IMEINumber = sessionStorage.getItem('IMEI')
    this.CustomerID = sessionStorage.getItem("CustomerId");
    // ----------------------------------------------------------------
    this.DeviceStorage = sessionStorage.getItem("DeviceStorage")
    this.DeviceColor = sessionStorage.getItem("DeviceColor")
    this.AdditionalDownpayment1 = sessionStorage.getItem('AdditionalDownpayment')
    this.SchemeDownpayment1 = sessionStorage.getItem('SchemeDownpayment')
    this.Scheme = sessionStorage.getItem('Scheme')
    this.processingfee1 = sessionStorage.getItem('processingfee')
    this.EmiAmount1 = sessionStorage.getItem('EMIAmount')
    this.LoanAmount1 = sessionStorage.getItem('LoanAmount')
    this.Tenor = sessionStorage.getItem('Tenor')
    // ---------------------------------------------------------------


    this.AdditionalDownpayment = Intl.NumberFormat('en-US').format(this.AdditionalDownpayment1);
    this.SchemeDownpayment = Intl.NumberFormat('en-US').format(this.SchemeDownpayment1);
    this.processingfee = Intl.NumberFormat('en-US').format(this.processingfee1);
    this.LoanAmount = Intl.NumberFormat('en-US').format(this.LoanAmount1);
    this.EmiAmount = Intl.NumberFormat('en-US').format(this.EmiAmount1);
    // this.totalDownpayment1 = parseInt(this.SchemeDownpayment1) + parseInt(this.AdditionalDownpayment) + parseInt(this.processingfee1);
    // console.log(this.totalDownpayment1,"fghjkl")
    this.totalDownpayment2 = sessionStorage.getItem('TotalAmount1')
    this.totalDownpayment = Intl.NumberFormat('en-US').format(this.totalDownpayment2);
    // ----------Dealer------------------------
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
  getdata: any;
  isdisable: boolean = false;

  proceed(event: any) {
    this.Loader1 = true;
    this.isDisabled = true;
    this.isDisabled1 = true
    // this.Modelsection = true;
    this.service.Getappinstall(this.CustomerID).subscribe(res => {
      this.getdata = res;
      if (this.getdata.Data == 204) {
        console.log('response')
        this.checkcallbackstatus();
      } else {
        this.Loader1 = false;
        console.log("error")
        this.Modelsection = true;
      }
      // this.finaldata();
      // this.Modelsection = true;
      console.log(this.getdata, 'appinstal')

    })
    // this.checkcallbackstatus();
    // event.preventDefault();
    console.log("sdrtfyghjkl;'")

  }
  final: any
  finaldata() {
    this.service.finalSubmission(this.CustomerID, '0061002473', '1', '1', '1', '1').subscribe(res => {
      this.final = res;
    })
  }
  pdf: any;
  download(event: any) {
    this.Loader2 = true;
    event.preventDefault();
    window.open(this.finalDo, '_blank');
    // this.service.GetFinalDO(this.CustomerID).subscribe(res => {
    //   this.response = res;
    //   this.Loader2 = false;
    //   this.pdf = this.response.Data[0].URL;
    //   console.log(this.pdf, "pdf")
    //   console.log(this.response, "response")
    //   window.open(this.pdf, '_blank');
    // })
  }
  homepage() {
    this.Model = false;
    this.router.navigate(['']);
  }
  Loader2: boolean = false;
  // enableBtn:boolean=false;
  isDisabled1: boolean = false
  Modelsection: boolean = false;
  finalDo: any;
  Appfinal: any;
  Disbursal: any
  count: number = 0;
  isDisabled: boolean = false
  checkcallbackstatus() {
    this.Loader1 = true;
    this.service.checkcallback(this.CustomerID).subscribe(res => {
      console.log(res);

      this.finalDo = res.Data.Final_Delivery_Order;

      this.Appfinal = res.Data.App_Install_Flag
      this.Disbursal = res.Data.Disbursal_Callback


      console.log(this.finalDo, '')

      if (this.finalDo != '' && this.Appfinal != '') {
        this.Loader1 = false;
        this.isdisable = true;
        this.Modelsection = true;

        // this.modalService.open(qpaper);
        // this.enableBtn=true;

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
          this.isDisabled1 = false
          this.Loader1 = false
          this.count = 0;

        }
        return;
      }

    });
  }


  insertCommas(amount: number) {
    let value = amount.toFixed(2);
    let parts = value.split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
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
      // window.location.href=this.redirection;
    })
  }
}