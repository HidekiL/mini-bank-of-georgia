import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { Validators } from 'src/app/validation-message/bg-validators';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { UserResponseData } from 'src/app/shared/response.model';
import { LoaderService } from 'src/app/shared/loader/loader.service';
import { AlertService } from 'src/app/shared/alert/alert.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'bg-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  userForm: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private alert: AlertService
  ) { }

  ngOnInit(): void {
    this.userForm = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(36)]),
      user: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(36)]),
      password: new FormGroup({
        password1: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(36)]),
        password2: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(36)])
      }, Validators.passwordMatch)
    });
  }

  get(control: string) {
    return this.userForm.get(control);
  }

  errors(controlName) {
    return this.get(controlName)?.errors
      ? Object.values(this.get(controlName).errors)
      : [];
  }

  onSubmit() {
    const name = this.get('name').value;
    const username = this.get('user').value;
    const password = this.get('password.password1').value;

    this.authService.registerUser(name, username, password).subscribe(
      (response: UserResponseData) => {
        if (response) {
          // user was registered, show registration success message and navigate to login
          this.alert.showAlertMessage('თქვენ წარმატებით გაიარეთ რეგისტრაცია!', 'success');
          this.userForm.reset();
          this.router.navigate(['..'], { relativeTo: this.route });
        }
      }, error => {
        // show error message
        this.alert.showAlertMessage(error.error, 'error');
      }
    );
  }
}
