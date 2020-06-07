import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { Validators } from 'src/app/validation-message/bg-validators';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { LoaderService } from 'src/app/shared/loader/loader.service';
import { AlertService } from 'src/app/shared/alert/alert.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'bg-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private authService: AuthService, private loader: LoaderService, private alert: AlertService) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      user: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(36)]),
      password: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(36)])
    });
  }

  get(control: string) {
    return this.loginForm.get(control);
  }

  errors(controlName) {
    return this.get(controlName)?.errors
      ? Object.values(this.get(controlName).errors)
      : [];
  }

  onLoginSubmit() {
    this.authService.login(this.loginForm.value);
  }
}
