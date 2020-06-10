import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

import { Validators } from 'src/app/validation-message/bg-validators';
import { AccountsService } from 'src/app/shared/clients/accounts/accounts.service';
import { AlertService } from 'src/app/shared/alert/alert.service';
import { AccountsResponseData } from 'src/app/shared/response.model';
import { ClientService } from 'src/app/shared/clients/clients.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'bg-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit, OnDestroy {
  accountForm: FormGroup;
  accountSubscription: Subscription;

  constructor(
    private accountsService: AccountsService,
    private alertService: AlertService,
    private router: Router,
    private clientService: ClientService
  ) { }

  ngOnInit(): void {
    this.accountForm = new FormGroup({
      accountName: new FormControl(null, [Validators.required, Validators.maxLength(30), Validators.minLength(2)]),
      amount: new FormControl(null, [Validators.positive])
    });
  }

  onAccountAdd() {
    const clientKey = JSON.parse(localStorage.getItem('clientData')).clientKey;
    const accountName = this.accountForm.get('accountName').value;
    const amount = this.accountForm.get('amount').value;

    this.accountsService.addAccount(clientKey, accountName, amount).subscribe(
      (response: AccountsResponseData) => {
        this.clientService.sumSubject.next(response.amount);
        this.accountsService.accountSubject.next(response);
        this.alertService.showAlertMessage('ბარათი წარმატებით დაემატა კლიენტზე', 'success');
        this.router.navigate(['/krn/accounts']);
      }, error => {
        this.alertService.showAlertMessage(error.error, 'error');
      }
    );
  }

  ngOnDestroy() {
    if (this.accountSubscription) {
      this.accountSubscription.unsubscribe();
    }
  }
}
