import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpService } from 'src/app/Services/http.service';
// import { CustomCurrency } from './pipes/customCurrency.pipe';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
// import { clear } from 'console';
import { Pipe, PipeTransform } from '@angular/core'

@Component({
  selector: 'app-loan-senction-page-two',
  templateUrl: './loan-senction-page-two.component.html',
  styleUrls: ['./loan-senction-page-two.component.scss']
})
export class LoanSenctionPageTwoComponent implements OnInit {

  constructor(private router: Router, private service: HttpService, private formBuilder: FormBuilder,
    // private activeModal: NgbActiveModal
    public dialog: MatDialog
  ) { }


  @ViewChild('closeButton') closeButton: any;
  // @ViewChild('closebutton') closebutton: any;
  IMEIform!: FormGroup
  downpayment: any;
  processingfee: any;
  totalamount: any;
  EmiAmount: any;
  Tenor: any;
  CustomerID: any;
  Loader1: boolean = false;
  Loader2: boolean = false;
  IMEINumber: any;
  IMEI: any
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
  Tenor1: any
  nfObject: any
  AdditionalDownpayment: any;
  SchemeDownpayment: any;
  Scheme: any;
  LoanAmount: any;
  AdditionalDownpayment1: any;
  SchemeDownpayment1: any;
  Scheme1: any;
  LoanAmount1: any;
  totalDownpayment1: any;
  totalDownpayment: any;
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
  Imagehide: boolean = false;
  ngOnInit(): void {
    this.pan = sessionStorage.getItem("PanNumber");
    this.mobile = sessionStorage.getItem('Mobile');
    this.ApplicationId = sessionStorage.getItem('ApplictionId')
    this.Customer_name = sessionStorage.getItem("CustomerName");
    this.Callback_url = sessionStorage.getItem('Calback');
    this.Pin = sessionStorage.getItem('PIN')
    this.Email = sessionStorage.getItem("Email")
    // ------------------------------------------------------------
    // this.Loader1=true;
    this.CustomerID = sessionStorage.getItem("CustomerId");
    // ----------------------------------------------------------------

    this.AdditionalDownpayment1 = sessionStorage.getItem('AdditionalDownpayment')
    this.SchemeDownpayment1 = sessionStorage.getItem('SchemeDownpayment')
    this.Scheme = sessionStorage.getItem('Scheme')
    this.processingfee1 = sessionStorage.getItem('processingfee')
    this.EmiAmount1 = sessionStorage.getItem('EMIAmount')
    this.LoanAmount1 = sessionStorage.getItem('LoanAmount')
    this.Tenor = sessionStorage.getItem('Tenor')
    // ---------------------------------------------------------------
    this.DeviceStorage = sessionStorage.getItem("DeviceStorage")
    this.DeviceColor = sessionStorage.getItem("DeviceColor")

    this.AdditionalDownpayment = Intl.NumberFormat('en-US').format(this.AdditionalDownpayment1);
    this.SchemeDownpayment = Intl.NumberFormat('en-US').format(this.SchemeDownpayment1);
    this.processingfee = Intl.NumberFormat('en-US').format(this.processingfee1);
    this.LoanAmount = Intl.NumberFormat('en-US').format(this.LoanAmount1);
    this.EmiAmount = Intl.NumberFormat('en-US').format(this.EmiAmount1);

    this.totalDownpayment2 = sessionStorage.getItem('TotalAmount1')
    // this.totalDownpayment1 = parseInt(this.SchemeDownpayment1) + parseInt(this.AdditionalDownpayment) + parseInt(this.processingfee1) ;
    // console.log(this.totalDownpayment1,"fghjkl")
    this.totalDownpayment = Intl.NumberFormat('en-US').format(this.totalDownpayment2);
    console.log(this.totalDownpayment2, "ghjk")
    // this.Scheme = Intl.NumberFormat('en-US').format(this.Scheme1);




    // ----------------------currency--Formate--------------------?

    // this.nfObject = new Intl.NumberFormat('en-US');
    // this.downpayment = this.nfObject.format(this.downpayment1);

    // this.downpayment = downpayment1.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    // this.downpayment = downpayment1.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
    // this.downpayment = Intl.NumberFormat('en-US').format(this.downpayment1); 
    // ----------------------currency--Formate--------------------?


    console.log(this.downpayment)
    // ------------------Dealer-----
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
    console.log(this.Deviceimage, "Image")
    this.Warrentyname = sessionStorage.getItem('WarrentyName')
    // this.Deviceimage=
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
  WarrentyimageHide: boolean = false;
  Deviceimage1: any
  Model: boolean = false;
  procceed(event: any) {
    this.Loader1 = false;
    event.preventDefault();
    // this.Modeldiv = true;
    console.log("Anupam")

  }
  initform() {
    this.IMEIform = this.formBuilder.group({
      IMEINumber: ['', [Validators.required]],

    })
  }

  numberWithCommas(x: any) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  // get currentModal(){
  //   return this.activeModal;
  // }

  imeiQrData: any;
  imeiNumber: any;
  Modeldiv: boolean = false;
  response: any;
  next(event: any) {

    event.preventDefault();

    this.Loader1 = true;
    // this.Modeldiv = true;
    // if (this.ImeiNumber > 15 || this.ImeiNumber < 15) {
    //   this.Loader1 = false;
    //   this.error = "Please Enter valid IMEI number"
    // }
    // if (this.ImeiNumber == 15) {
    // this.ImeiNumber
    this.service.GetIMEI(this.CustomerID, this.ImeiNumber).subscribe(res => {
      this.response = res;

      console.log(res, 'HJkl')
      if (this.response.Data.errcode == 1) {
        this.Loader1 = false;
        this.error = 'Invalid IMEI number'
      }
      else {
        if (this.response.Data.IMEI_Update_Status == 204 && this.response.Data.IMEI_Validate_Status == 200) {


          this.error = '';
          this.Loader1 = false;
          //  event.preventDefault();
          // this.currentModal.dismiss();
          this.closeButton.nativeElement.focus();
          this.router.navigate(['/loan-senction-three'])
          // setTimeout(() => {

          //   this.closeButton.nativeElement.focus();
          // }, 0);
          // this.closeButton.nativeElement.click();
          // clear()
        }
        else {
          this.Loader1 = false;
          console.log("error")
        }

      }

    }, (error) => {
      console.error('error caught in component')

      this.error = 'Technical Error'
      this.Loader1 = false;

    })
    // }
  }
  ImeiNumber: any;
  error: any
  onKey(event: any) {
    const inputValue = event.target.value;
    this.ImeiNumber = inputValue
    console.log(this.ImeiNumber, "IMEII")
    sessionStorage.setItem('IMEI', this.ImeiNumber)
  }
  numberOnly(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
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
