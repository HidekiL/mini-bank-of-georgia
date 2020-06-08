import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { BgValidatorService } from './bg-validators.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'bg-validation-message',
  templateUrl: './validation-message.component.html',
  styleUrls: ['./validation-message.component.scss']
})
export class ValidationMessageComponent implements OnInit {
  control;

  constructor(private validatorsService: BgValidatorService) { }

  ngOnInit(): void {
    this.validatorsService.formSubject.subscribe(
      (control: FormControl | FormGroup) => {
        this.control = control;
        console.log(this.control);
      }
    );
  }

  get(control: string) {
    return this.control;
  }

  errors(controlName) {
    return this.get(controlName)?.errors
      ? Object.values(this.get(controlName).errors)
      : [];
  }
}
