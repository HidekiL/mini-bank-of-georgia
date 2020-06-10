import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AccountsService } from 'src/app/shared/clients/accounts/accounts.service';
import { AccountsResponseData } from 'src/app/shared/response.model';
import { AlertService } from 'src/app/shared/alert/alert.service';
import { ClientService } from 'src/app/shared/clients/clients.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'bg-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit {
  accounts: AccountsResponseData[];
  showAccounts = true;

  constructor(
    private router: Router,
    private accountsService: AccountsService,
    private alertService: AlertService,
    private clientService: ClientService
  ) { }

  ngOnInit(): void {
    this.accountsService.getAccounts().subscribe(
      response => {
        this.accounts = response;
      }
    );

    this.accountsService.accountSubject.subscribe(
      (newAccount: AccountsResponseData) => {
        this.accounts.push(newAccount);
      }
    );
  }

  onAccountAdd() {
    this.showAccounts = false;
    this.router.navigate(['/krn/accounts/create']);
  }

  onDeleteAccount(index: number, accountKey: number, amount: number) {
    this.accountsService.deleteAccount(accountKey).subscribe(
      () => {
        this.clientService.sumSubject.next(-amount);
        this.alertService.showAlertMessage('აკაუნტი წარმატებით წაიშალა', 'success');
      }, error => {
        this.alertService.showAlertMessage(error.error, 'error');
      }
    );
    this.accounts.splice(index, 1);
  }
}
