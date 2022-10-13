import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/Services/http.service';

@Component({
  selector: 'app-emi-offer-two',
  templateUrl: './emi-offer-two.component.html',
  styleUrls: ['./emi-offer-two.component.scss']
})
export class EmiOfferTwoComponent implements OnInit {

  constructor(private router: Router, private service: HttpService) {

  }
  pan: any;
  mobile: any
  ApplicationId: any
  Customer_name: any;
  Callback_url: any
  Email: any
  Pin: any
  //  itemsList: any[] = [];
  downpayment: any;
  processingfee: any;
  totalamount: any;
  EmiAmount: any;
  Tenor: any;
  CustomerID: any;
  Loader1: boolean = false;
  TotalAmount!: number;
  price1!: number;
  price2!: number;
  count: any;
  DeviceStorage: any;
  DeviceColor: any;
  buttonHide: boolean = false;
  ngOnInit(): void {
    this.count = 0;
    this.pan = sessionStorage.getItem("PanNumber");
    this.mobile = sessionStorage.getItem('Mobile');
    this.ApplicationId = sessionStorage.getItem('ApplictionId')
    this.Customer_name = sessionStorage.getItem("CustomerName");
    this.Callback_url = sessionStorage.getItem('Calback');
    this.Pin = sessionStorage.getItem('PIN')
    this.Email = sessionStorage.getItem("Email")
    this.CustomerID = sessionStorage.getItem("CustomerId");
    this.Dealerid = sessionStorage.getItem('Dealerid')
    this.DeviceStorage = sessionStorage.getItem("DeviceStorage")
    this.DeviceColor = sessionStorage.getItem("DeviceColor")
    // console.log(this.Dealerid)
    sessionStorage.getItem('Calback')
    this.Applictionid = sessionStorage.getItem('ApplictionId')
    this.DeviceName = sessionStorage.getItem('DeviceName')
    console.log(this.DeviceName, "device")
    this.Devicetype = sessionStorage.getItem('DeviceType')
    // console.log(this.Devicetype)
    this.Devicemodel = sessionStorage.getItem('DeviceModel')
    this.Devicecode = sessionStorage.getItem('DeviceCode')
    this.Devicedescription = sessionStorage.getItem('DeviceDescription')
    this.Deviceprice = sessionStorage.getItem('DevicePrice')
    this.Deviceimage = sessionStorage.getItem('DeviceImage')
    this.Warrentyname = sessionStorage.getItem('WarrentyName')
    if (this.Deviceimage == '') {
      this.Imagehide = true;
      // this.Imagehide = !this.Imagehide
    }
    if (this.Warrentyimage == '') {
      this.WarrentyimageHide = true;
      // this.Imagehide = !this.Imagehide
    }
    // console.log(this.Deviceprice, "Deviceprice")
    this.Warrentydes = sessionStorage.getItem('WarrentyDes')
    this.Warrentyprice = sessionStorage.getItem('WarrentyPrice')
    this.Warrentytenor = sessionStorage.getItem('WarrentyTenor')
    this.Warrentyimage = sessionStorage.getItem('WarrentyImage')
    this.OfferAmount = sessionStorage.getItem('OfferAmount');
    // console.log(this.Warrentyprice, "warrenty")

    this.price1 = this.Deviceprice;
    // console.log(this.price1)
    this.price2 = this.Warrentyprice
    this.TotalAmount = parseInt(this.Deviceprice) + parseInt(this.Warrentyprice);

    // console.log(this.TotalAmount, "totalamount")
    // ? this.Warrentyprice : 0;
    this.getpaymentshedule()

  }
  Imagehide: boolean = false;
  WarrentyimageHide: boolean = false;

  OfferAmount: any;
  response: any;
  item: string = '';
  products: any[] = [];

  radioSelected: string = '';
  radioSelectedString: string = '';
  radioSel: any;
  emi: any
  EMi: any;
  prdeuct: any;


  itemid: any
  Downpayment: any;
  tenor: any

  getpaymentshedule() {
    this.Loader1 = true;
    this.service.getpaymentschedule(this.CustomerID).subscribe(res => {
      this.Payment = res.Data;
      this.Loader1 = false;
      // console.log(this.Payment, "payment")
      this.products = this.Payment.EMI_Schedule
      // console.log(this.products, "Products")
    })
  }

  onItemChange(product: any) {
    // console.log(product)
    this.itemid = product;
    this.Downpayment = product.Down_Payment;
    this.buttonHide = true;
    this.tenor = product.EMI_Tenor;
    // console.log(this.tenor, "Tenor")
    sessionStorage.setItem('AdditionalDownpayment', product.Additional_Down_Payment)
    sessionStorage.setItem('SchemeDownpayment', product.Scheme_Down_Payment)
    sessionStorage.setItem('Scheme', product.Scheme)
    sessionStorage.setItem('processingfee', product.Processing_Fee)
    sessionStorage.setItem('EMIAmount', product.EMI_Amount)
    sessionStorage.setItem('LoanAmount', product.Loan_Amount)
    sessionStorage.setItem('Tenor', product.EMI_Tenor)
    // console.log(this.Downpayment, "downpayment")

  }

  response1: any;
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

  Payment: any;
  AdditionalDownpayment: any;
  SchemeDownpayment: any;
  Scheme: any;
  LoanAmount: any;


  continueKYC() {
    this.Loader1 = true;
    this.AdditionalDownpayment = sessionStorage.getItem('AdditionalDownpayment')
    this.SchemeDownpayment = sessionStorage.getItem('SchemeDownpayment')
    this.Scheme = sessionStorage.getItem('Scheme')
    this.processingfee = sessionStorage.getItem('processingfee')
    this.EmiAmount = sessionStorage.getItem('EMIAmount')
    this.LoanAmount = sessionStorage.getItem('LoanAmount')
    this.Tenor = sessionStorage.getItem('Tenor')
    // console.log(this.downpayment)
    // console.log(this.processingfee)
    // console.log(this.totalamount)
    // console.log(this.EmiAmount)
    // console.log(this.Tenor)
    this.service.getOfferSelect(this.CustomerID, this.EmiAmount, this.Tenor, this.Scheme, this.SchemeDownpayment, this.AdditionalDownpayment, this.processingfee, this.LoanAmount).subscribe(res => {
      console.log(res);
      this.response1 = res.Status;
      if (this.response1 == 200) {
        this.Loader1 = false;
        this.router.navigate(['kyc-verification'])
      }
      else {
        this.Loader1 = false;
        console.log('eror')
      }
    })

  }
  tab: any = 'tab1';
  tab1: any
  tab2: any
  tab3: any
  tab4: any
  tab5: any
  step: any;
  onClick(check: any) {
    console.log(check);
    if (check == 1) {
      this.tab = 'tab1';
    } else if (check == 2) {
      this.tab = 'tab2';
    }
    else if (check == 3) {
      this.tab = 'tab3';
    }
    else if (check == 4) {
      this.tab = 'tab4';
    }
    else {
      this.tab = 'tab5';
    }
  }
  ExitResponse: any
  exit() {
    this.service.Exit(this.ApplicationId, "Exit_From_Offer_Screen", "Gracefull_Exit", this.Customer_name, this.mobile,
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

      this.RedirectCallback = this.Callback_url
      console.log(this.Response1, "Callback response")

      this.redirection = this.Callback_url + '/affordability/callback?applicationId=' + this.ApplicationId + '&status=exit'
      console.log(this.redirection, "redir")
      window.location.href = this.redirection;
    })
  }
}

