import { Component, OnInit, OnDestroy, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { Validators } from 'src/app/validation-message/bg-validators';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { UserResponseData } from 'src/app/shared/response.model';
import { LoaderService } from 'src/app/shared/loader/loader.service';
import { AlertService } from 'src/app/shared/alert/alert.service';
import { BgValidatorService } from 'src/app/validation-message/bg-validators.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'bg-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {
  userForm: FormGroup;
  registrSubscription: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private loader: LoaderService,
    private alert: AlertService,
    private validatorService: BgValidatorService
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

    this.onFormChange(this.userForm);
  }

  onFormChange(group: FormGroup): void {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);
      if (abstractControl instanceof FormGroup) {
        abstractControl.valueChanges.subscribe(val => {
          this.validatorService.onFormChange(abstractControl);
        });
        this.onFormChange(abstractControl);
      } else {
        abstractControl.valueChanges.subscribe(val => {
          this.validatorService.onFormChange(abstractControl);
        });
      }
    });
  }

  onSubmit() {
    this.loader.isLoading = true;
    this.registrSubscription = this.authService.registerUser(this.userForm.value).subscribe(
      (response: UserResponseData) => {
        if (response) {
          // user was registered, show registration success message and navigate to login
          this.loader.isLoading = false;
          this.alert.showAlertMessage('თქვენ წარმატებით გაიარეთ რეგისტრაცია!', 'success');
          this.userForm.reset();
          this.router.navigate(['..'], { relativeTo: this.route });
        }
      }, error => {
        // show error message
        this.loader.isLoading = false;
        this.alert.showAlertMessage(error.error, 'error');
      }
    );
  }

  ngOnDestroy() {
    if (this.registrSubscription) {
      this.registrSubscription.unsubscribe();
    }
  }

}
