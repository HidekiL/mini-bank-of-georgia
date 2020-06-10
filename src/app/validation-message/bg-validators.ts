import { Validators as NGValidators, AbstractControl, FormControl } from '@angular/forms';

export class Validators extends NGValidators {
  static minLength(length: number) {
    return (control: AbstractControl) =>
      super.minLength(length)(control)
        ? { minLength: 'ველის სიგრძე არ შეიძლება იყოს ' + length + '-ზე ნაკლები' }
        : null;
  }

  static maxLength(length: number) {
    return (control: AbstractControl) =>
      super.maxLength(length)(control)
        ? { maxLength: 'ველის სიგრძე არ შეიძლება იყოს ' + length + '-ზე მეტი' }
        : null;
  }

  static required(control: AbstractControl) {
    return super.required(control)
      ? { required: 'ველი აუცილებელია' }
      : null;
  }

  static positive(control: AbstractControl) {
    return control.value >= 0 || control.value === null ? null : { positiveNum: 'გთხოვთ შეიყვანოთ დადებითი რიცხვი' };
  }

  static passwordMatch(controls) {
    // check if passwords match
    // tslint:disable-next-line: no-string-literal
    return controls.value.password1 !== controls.value.password2 ? { passwordMatch: 'პაროლები არ ემთხვევა' } : null;
  }
}
