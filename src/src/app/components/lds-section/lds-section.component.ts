import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

// import { SecurityCheckService } from 'src/app/securityCheck/security-check.service';
import { HttpService } from 'src/app/Services/http.service';



@Component({
  selector: 'app-lds-section',
  templateUrl: './lds-section.component.html',
  styleUrls: ['./lds-section.component.scss']
})
export class LdsSectionComponent implements OnInit {

  // @Input() fromVerif;

  assignmnet: any = '';
  showMore: number = 0;
  deviceInfo: any = '';
  enableBtn: boolean = false;
  encryptKey = { requestKey: '', secretKey: '' };
  callbackUrl = '';
  userDetails: any = {};
  panelOpenState = false;
  showLoader: boolean = false;
  partnerName: any;
  requestKey: any;
  RequestKey: any
  Loader1: boolean = false;
  CustomerID: any;
  mandate_decision: any;
  constructor(private httpService: HttpService, private route: ActivatedRoute, private router: Router,
    private deviceService: DeviceDetectorService,
    private modals: NgbModal) { }
    pan:any;
    mobile:any
    ApplicationId:any
    Customer_name:any;
    Callback_url:any
  Email:any
  Pin:any
  ngOnInit(): void {
    this.CustomerID = sessionStorage.getItem("CustomerId");
    this.RequestKey = sessionStorage.getItem('requestKey')
    this.pan = sessionStorage.getItem("PanNumber");
 this.mobile = sessionStorage.getItem('Mobile');
this.ApplicationId=sessionStorage.getItem('ApplictionId')
this.Customer_name=sessionStorage.getItem("CustomerName");
    this.Callback_url=sessionStorage.getItem('Calback');
 this.Pin=sessionStorage.getItem('PIN')
this.Email=sessionStorage.getItem("Email")
    this.getDeviceInfo();
    setTimeout(() => {                           // <<<---using ()=> syntax
      this.getDocumentData()
    }, 5000);

  }

  expandMenu(event: any) {
    this.showMore = event;
  }

  onChange(event: any) {
    this.enableBtn = false;
    if (event.checked) {
      this.enableBtn = true;
      // this.getEventTrack('LDS_User_Agree','Event');
    }
  }
  procced: any;
  submit() {
    this.enableBtn = false;
    this.Loader1 = true;

    this.httpService.termscondition(this.CustomerID, '1').subscribe(data => {
      this.procced = data;
      // this.Loader1 = false;
      this.httpService.getKYCurl(this.CustomerID, 'E-mandate').subscribe(res => {
        // this.Loader1 = false;

        this.dynamicURL = res['Data'];
        const width = screen.width * 0.62 < 400 ? 400 : screen.width * 0.62;
        const height = screen.height * 0.62;
        const left = (screen.width / 2) - (width / 2);
        const top = (screen.height / 2) - (height / 2);
        this.dmiKYCWindow = window.open(this.dynamicURL, '_blank', ',scrollbars=1,menubar=0,resizable=1,width = ' + width + ', height = ' + height + ', top = ' + top + ', left = ' + left);




        this.checkDmiKYCWindowInterval = setInterval(() => {
          this.checkIfDmiKycClosed();
        }, 300);

        this.checkcallbackstatus3();
        // this.router.navigate(['/loan-senction']);
      });
      // let data = { key: this.encryptKey, data: this.userDetails };
    })
  }

  getDeviceType() {
    let deviceType: any;
    if (this.deviceService.isMobile() == true) { deviceType = 'Mobile'; }
    else if (this.deviceService.isTablet() == true) { deviceType = 'Tablet'; }
    else if (this.deviceService.isDesktop() == true) { deviceType = 'Desktop' };
    return deviceType;
  }

  getDeviceInfo() {
    //Device Info
    this.deviceInfo = this.deviceService.getDeviceInfo();
    let deviceDetails = {
      "UserAgent": this.deviceInfo.userAgent,
      "OS": this.deviceInfo.os,
      "OS_Version": this.deviceInfo.os_version,
      "Browser": this.deviceInfo.browser,
      "Browser_Version": this.deviceInfo.browser_version,
      "DeviceType": this.getDeviceType(),
    }

    this.route.queryParams.subscribe(
      params => {
        this.requestKey = params['key'];
        this.showLoader = true;

      });
  }
  totalAmount:any
  getDocumentData() {
    this.RequestKey = sessionStorage.getItem('requestKey')
    this.showLoader = true;
    this.httpService.getDocData(this.RequestKey).subscribe(res => {
      console.log(this.partnerName, "ahbsukhk")
      this.userDetails = res;
      console.log(this.userDetails, "dfghjjih")
      this.partnerName = this.userDetails.Partner_Name;
      this.totalAmount=  parseInt(this.userDetails.Loan_Amount)+ parseInt(this.userDetails.Warranty_Loan_Amount);
      this.showLoader = false;

    });

  }

  ExitResponse:any
  exit() {
    this.httpService.Exit(this.ApplicationId, "Exit_From_LDS_Screen", "Gracefull_Exit", this.Customer_name, this.mobile,
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
  Response1:any;
  Response2:any;
  RedirectCallback:any;
  redirection:any
  Callback() {
     
      this.httpService.CallBack(this.ApplicationId,"Exit").subscribe(response => {
        this.Response1 = response;
        this.Response2= this.Response1['data'][0]
        console.log(this.Response2)
        // this.RedirectCallback=this.response1.Data.Callback_URL
        this.RedirectCallback = this.Callback_url
        console.log(this.Response1, "Callback response")
  
        this.redirection = this.Callback_url + '/affordability/callback?applicationId=' + this.ApplicationId + '&status=exit'
        console.log(this.redirection, "redir")
        window.location.href=this.redirection;
      })
    }
  // ------Emandate-callback--------------------------------------
  checkDmiKYCWindowInterval: any;
  dynamicURL: any;
  isKYCReject: any;
  dmiKYCWindow!: Window | null;
  error: any
  preDo: any;
  checkcallbackstatus3() {

    this.httpService.checkcallback(this.CustomerID).subscribe(res => {

      this.mandate_decision = res.Data
       this.preDo = this.mandate_decision.Pre_Delivery_Order;
      console.log(this.preDo,"Predo")
      sessionStorage.setItem('preDoUrl',this.preDo);
      // && this.mandate_decision.Opportunity_ID != ''
      if (this.mandate_decision.NACH_Status == 'Initiated') {

        clearInterval(this.checkDmiKYCWindowInterval);
        this.dmiKYCWindow!.close();
        this.Loader1 = false;
        this.router.navigate(['/loan-senction']);

      }
      else if (this.mandate_decision.NACH_Status == 'Failure') {
        this.dmiKYCWindow!.close();
        this.enableBtn = true;
        this.Loader1 = false;
        this.router.navigate(['/error-page']);
        // this.isDisabled2 = false;
        // this.isEMandateCompleted = false;
        // this.emandateStatus = "Please Try Again";

        return;
      }
      else if (this.mandate_decision.NACH_Status == 'Rejected') {
        this.dmiKYCWindow!.close();
        this.enableBtn = true;
        this.error = 'Emandate is Rejected!'
        return;
      }
      else {
        this.count += 1;
        // console.log(this.count,'count');
        if (this.count <= 50) {
          setTimeout(() => {
            this.checkcallbackstatus3();

          }, 4000);
        }
        else {
          this.Loader1 = false;
          // this.tryagain = true;

          clearInterval(this.checkDmiKYCWindowInterval);
          this.dmiKYCWindow!.close();

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
  checkIfDmiKycClosed() {
    if (this.dmiKYCWindow?.closed) {
      this.Loader1 = false;
      this.enableBtn = true;
      clearInterval(this.checkDmiKYCWindowInterval);
    }
  }

}