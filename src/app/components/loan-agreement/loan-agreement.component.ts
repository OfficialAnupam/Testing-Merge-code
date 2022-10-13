import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from 'src/app/Services/http.service';


@Component({
  selector: 'app-loan-agreement',
  templateUrl: './loan-agreement.component.html',
  styleUrls: ['./loan-agreement.component.scss']
})
export class LoanAgreementComponent implements OnInit {

  @Input() agreementDetails:any='';
  panelOpenState = false;
  selectedCheckOptn:any='';

  constructor(private httpService: HttpService) { }

  ngOnInit(): void {
  }

  suboptionSelected(value: number){
    this.selectedCheckOptn=value;
    let selected:any='';
    if(value==1){selected='Yes'}else{selected='No'};
    // this.getEventTrack('LDS_Assessed_To_Tax-'+selected,'Event');
  }

  // getEventTrack(eventName: string,eventType: string){
  //   this.httpService.getDocEvent(this.agreementDetails.key.requestKey,eventName,eventType,'','','','','',this.agreementDetails.key.secretKey).subscribe();
  // }

}
