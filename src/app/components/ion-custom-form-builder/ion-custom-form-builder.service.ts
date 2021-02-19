import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})


export class IonCustomFormBuilderService {

  /**
   *
   *
   * @type {Subject<boolean>}
   * @memberof IonCustomFormBuilderService
   */
  triggerFormSubmission$: Subject<boolean> = new Subject();

  constructor() { }

}
