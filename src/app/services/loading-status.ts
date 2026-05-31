import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { __values } from 'tslib';

@Injectable({
  providedIn: 'root',
})
export class LoadingStatus {
  public status:BehaviorSubject<any> = new BehaviorSubject(false);
  constructor(){}
}
