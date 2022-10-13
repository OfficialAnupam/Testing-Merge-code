import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { LocationStrategy } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class NavigationDisableService {
  eventValue:any = '';
  public showAlert = false;

  constructor(private router: Router) { }
  
  // disableBackButton() {
  //   history.pushState(null, null, window.location.href);
  //   this.router.events.subscribe(event => {
  //     this.eventValue =  event
  //     if (event instanceof NavigationEnd) {
  //       history.pushState(null, null, null);
  //     };
  //   });
  // } 

  // addPopStateEventListener(){
  //   window.addEventListener('popstate', () => {
  //   window.history.pushState(null, null, null);
  //   this.alertData()
  //  });
  // }

  alertData(){
  if (this.eventValue != '') {
    this.showAlert = true;
    //  alert("Navigation is disabled")
       this.eventValue = '';
      return
      }
   }

}