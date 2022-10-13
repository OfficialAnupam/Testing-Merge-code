import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-offer-page-one',
  templateUrl: './offer-page-one.component.html',
  styleUrls: ['./offer-page-one.component.scss']
})
export class OfferPageOneComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  continueEmi(){
    this.router.navigate(['emi-offer'])
  }
}
