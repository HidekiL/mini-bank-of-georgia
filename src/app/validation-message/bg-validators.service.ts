import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class BgValidatorService {
  formSubject = new Subject();

  onFormChange(control) {
    this.formSubject.next(control);
  }
}