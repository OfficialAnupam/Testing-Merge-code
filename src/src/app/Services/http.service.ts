import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {


  constructor(private http: HttpClient) { }
  Baseurl = environment.baseurl;


  getdata(Request_Key: any): Observable<any> {
    return this.http.post<any>('https://apple-backend.dmifinance.in/los/apple/api/' + 'Get_Data_V3', { Request_Key });
  }
  // getdata(Request_Key: any): Observable<any> {
  //   return this.http.post<any>(this.Baseurl + 'Get_Data_V3', { Request_Key });
  // }
  sendOTP(Mobile: any) {
    return this.http.post(this.Baseurl + 'OTP_Send-3.0', { Mobile })
  }
  ResendOTP(Mobile: any) {
    return this.http.post(this.Baseurl + 'OTP_Send-3.0', { Mobile })
  }
  getverifyOTP(Mobile: any, OTP: any) {
    return this.http.post(this.Baseurl + 'OTP_Verify-3.0', { Mobile, OTP });
  }

  getEventTrack(Request_Key: string, Mobile: string, Event_Type: string, Event_Name: string, Origin: string, Partner_Name: string, Remark_1: string, Remark_2: string, Remark_3: string, Remark_4: string, Remark_5: string): Observable<any> {
    return this.http.post<any>(this.Baseurl + 'Event_Tracking-3.0',
      { Request_Key, Mobile, Event_Type, Event_Name, Origin, Partner_Name, Remark_1, Remark_2, Remark_3, Remark_4, Remark_5 })
  }

  getDeviceTrack(Request_Key: string, Agent_Id: string, Mobile: any, Device_Info: string, Browser_Info: any, Device_Version: any, OS_Type: string, Browser_Version: string, Longitude: string, Latitude: string, Location: string, Partner_Name: string): Observable<any> {
    return this.http.post<any>(this.Baseurl + 'Device_Tracking-3.0', { Request_Key, Agent_Id, Mobile, Device_Info, Browser_Info, Device_Version, OS_Type, Browser_Version, Longitude, Latitude, Location, Partner_Name })
  }

  CheckMobile(Customer_ID: any, Mobile: any) {
    return this.http.post(this.Baseurl + 'Update_Mobile-3.0', { Customer_ID, Mobile });
  }

  CheckEmail(Customer_ID: any, Email: any) {
    return this.http.post(this.Baseurl + 'Update_Email-3.0', { Customer_ID, Email });
  }
  updategender(Customer_ID: any, Gender: any) {
    return this.http.post(this.Baseurl + 'Update_Gender-3.0', { Customer_ID, Gender });
  }

  updatedob(Customer_ID: any, DOB: any) {
    return this.http.post(this.Baseurl + 'Update_DOB-3.0', { Customer_ID, DOB });
  }

  updatepincode(Customer_ID: any, Pincode: any) {
    return this.http.post(this.Baseurl + 'Update_Pincode-3.0', { Customer_ID, Pincode });
  }


  getempdetails(Customer_ID: any, Educational_Qualification: any) {
    return this.http.post(this.Baseurl + 'Update_Educational_Qualification-3.0', { Customer_ID, Educational_Qualification });
  }
  UpdateEmployment(Customer_ID: any, Employment_Type: any) {
    return this.http.post(this.Baseurl + 'Update_Employment_Type-3.0', { Customer_ID, Employment_Type });
  }
  // UpdateEMploymentdetails(Customer_ID: any,Company_Name:any,Average_Monthly_Income:any){
  //   return this.http.post(this.Baseurl +'Update_Employment_Details-3.0' , {Customer_ID,Company_Name,Average_Monthly_Income});
  // }

  UpdateMonthlyIncome(Customer_ID: any, Average_Monthly_Income: any) {
    return this.http.post(this.Baseurl + 'Update_Monthly_Income-3.0', { Customer_ID, Average_Monthly_Income });
  }
  UpdateCompanyName(Customer_ID: any, Company_Name: any) {
    return this.http.post(this.Baseurl + 'Update_Company_Name-3.0', { Customer_ID, Company_Name });
  }


  UpdateIndustry(Customer_ID: any, Industry: any) {
    return this.http.post(this.Baseurl + 'Update_Industry_Type-3.0', { Customer_ID, Industry });
  }

  getKYCurl(Customer_ID: any, Service_Name: any): Observable<any> {
    //const headers = new HttpHeaders({'Content-Type':'application/json', 'Authentication': 'JELFJVNKVMETHOD2GKVAV7X2PO8ICA'});
    return this.http.post<any>(this.Baseurl + 'Satellite_Services-3.0', { Customer_ID, Service_Name });
  }
  GetKycCallback(Customer_ID: any): Observable<any> {

    return this.http.post<any>(this.Baseurl + 'Get_KYC_Callback-3.0', { Customer_ID });

  }
  checkcallback(Customer_ID: any): Observable<any> {
    return this.http.post<any>(this.Baseurl + 'Check_Callback_Status-3.0', { Customer_ID });
  }

  UpdateAddress(Customer_ID: any, Street: any, Landmark: any, PostOffice: any, City: any, State: any, PostalCode: any) {
    return this.http.post(this.Baseurl + 'Update_Address-3.0', { Customer_ID, Street, Landmark, PostOffice, City, State, PostalCode });
  }

  getPincodeDetails(pincode: any): Observable<any> {

    return this.http.post<any>('https://dev.vistaconnect.com/Apple_LOS/api/' + "PL_Pincode", { Pincode: pincode })

  }
  Readyforconversion(Customer_ID: any): Observable<any> {
    return this.http.post<any>(this.Baseurl + 'Ready_For_Conversion-3.0', { Customer_ID });
  }

  ReadyForDecision(Customer_ID: any): Observable<any> {
    return this.http.post<any>(this.Baseurl + 'Ready_For_Decision-3.0', { Customer_ID });
  }
  GetOffer(Customer_ID: any): Observable<any> {
    return this.http.post<any>(this.Baseurl + 'Get_Offer_Callaback-3.0', { Customer_ID });
  }

  getpaymentschedule(Customer_ID: any): Observable<any> {
    return this.http.post<any>(this.Baseurl + 'Get_Offer_Details-3.0', { Customer_ID });
  }
  Exit(Application_ID: any, Status: any, Reason: any, Name: any, Mobile: any, Email: any, Address: any, Landmark: any, State: any, Pincode: any, PAN: any, Bank_Name: any, EMI: any, Tenor: any, Down_Payment: any): Observable<any> {
    return this.http.post<any>(this.Baseurl + 'Update_Transaction', { Application_ID, Status, Reason, Name, Mobile, Email, Address, Landmark, State, Pincode, PAN, Bank_Name, EMI, Tenor, Down_Payment });
  }

  CallBack(Application_ID: any, Status: any): Observable<any> {
    // let headers = new HttpHeaders({
    //   'Content-Type': "this.response2",
    //   'x-host':"this.response2",
    //   'client-id': "this.response2",
    //   'x-date': "this.response2",
    //   'hmac-signature': "this.response2",
    //   'client-session-id': "this.response2"
    // });
    // const headerDict = {
    //   'Content-Type': "this.response2",
    //     'x-host':"this.response2",
    //     'client-id': "this.response2",
    //     // 'x-date': "this.response2",
    //     'hmac-signature': "this.response2",
    //     'client-session-id': "this.response2"
    // }
    // const requestOptions = {                                                                                                                                                                                 
    //   headers: new HttpHeaders(headerDict), 
    // };
    // let httpHeaders = new HttpHeaders();
    // httpHeaders = httpHeaders.append('Authorization', 'my-auth-token');
    // httpHeaders = httpHeaders.append('ID', '001');
    // httpHeaders.set('Content-Type', 'application/json');  
    // let options = {headers:httpHeaders};
//     let headers = new HttpHeaders()
 
// headers=headers.append('content-type','application/json1')
// headers=headers.append('hmac-signature', '123456')
// headers=headers.append('client-session-id','application/x-www-form-urlencoded1')
    return this.http.post<any>(this.Baseurl + 'Callback_URL', { Application_ID, Status })
  }

  
  response2: any
  headerbody: any

  CallBack2(body:any): Observable<any> {
    const headers = { 'content-type': 'application/json'}  
    const body1=JSON.stringify(body);
    console.log(body1)
    return this.http.post<any>(this.Baseurl + 'Callback_URL', body1,{'headers':headers})
  }

  // CallBack2(redirection:any):Observable<any>{
  //   const headers = new HttpHeaders()
  //   .set( 'Content-Type', this.headerbody[0])
  //   .set('x-host',this.headerbody[1])
  //   .set('client-id',this.headerbody[3])
  //   .set('x-date',this.headerbody[2])
  //   .set('hmac-signature',this.headerbody[4]) 
  //   .set('client-session-id',this.headerbody[5])
  //   return this.http.post<any>(redirection , {}, {headers}).pipe(map((response: Response) => response.text()));
  // }
  getOfferSelect(Customer_ID: any, EMI: any, Tenor: any, Scheme: any, Scheme_Down_Payment: any, Additional_Down_Payment: any, Processing_Fee: any, Loan_Amount: any): Observable<any> {
    return this.http.post<any>(this.Baseurl + 'Offer_Select-3.0', { Customer_ID, EMI, Tenor, Scheme, Scheme_Down_Payment, Additional_Down_Payment, Processing_Fee, Loan_Amount });
  }
  getDocData(Request_Key: any): Observable<any> {
    // const headers = new HttpHeaders({'Authentication':'OOG5KEI5GUE7N9EP6HCEVOXIOQK6BQ','Secret-Key': secretKey});
    return this.http.post<any>('https://dmi.vistaconnect.com/LDS-Backend-V2.0/api/Get_Doc_Complete_Data', { Request_Key }).pipe(map(response => response.Data));
  }
  termscondition(Customer_ID: any, Term_Condition: any): Observable<any> {
    return this.http.post<any>(this.Baseurl + 'Accept_Terms_Condition-3.0', { Customer_ID, Term_Condition })
  }
  getCustomerID(PAN: any, Dealer_ID: any, Application_ID: any) {
    return this.http.post(this.Baseurl + 'Create_Customer_ID-3.0', { PAN, Dealer_ID, Application_ID });
  }

  GetPayment(Customer_ID: any, Collect_Payment: any): Observable<any> {
    return this.http.post<any>(this.Baseurl + 'Collect_Payment-3.0', { Customer_ID, Collect_Payment });
  }
  GetpreDo(Customer_ID: any) {
    return this.http.post<any>(this.Baseurl + 'Get_PRE_DO-3.0', { Customer_ID });
  }
  GetIMEI(Customer_ID: any, IMEI: any) {
    return this.http.post<any>(this.Baseurl + 'IMEI_Validate-3.0', { Customer_ID, IMEI });
  }
  GetFinalDO(Customer_ID: any) {
    return this.http.post<any>(this.Baseurl + 'Get_Final_DO-3.0', { Customer_ID });
  }
  Getappinstall(Customer_ID: any) {
    return this.http.post<any>(this.Baseurl + 'App_Install-3.0', { Customer_ID });
  }
  finalSubmission(Customer_ID: any, Partner_ID: any, Loan_Sanctioned: any, Pre_Delivery_Order: any, IMEI_Validation: any, Down_Payment_Collected: any) {
    return this.http.post<any>(this.Baseurl + 'Final_Submission-3.0', { Customer_ID, Partner_ID, Loan_Sanctioned, Pre_Delivery_Order, IMEI_Validation, Down_Payment_Collected });
  }

  AAService(body: any) {
    return this.http.post<any>('https://aa-uat.dmifinance.in/los/api/POST_Data_AA_V1.2', { body });
  }

}
