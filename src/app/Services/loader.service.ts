import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  public loader = new BehaviorSubject(false);
  constructor() { }

  public show() {
    this.loader.next(true);
  }

  public hide() {
    this.loader.next(false);
  }

}
