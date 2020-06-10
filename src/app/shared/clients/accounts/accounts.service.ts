import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Subject } from 'rxjs';

import { LoaderService } from '../../loader/loader.service';
import { AccountsResponseData } from '../../response.model';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {
  accountSubject = new Subject<AccountsResponseData>();

  constructor(
    private http: HttpClient,
    private loaderService: LoaderService
  ) { }

  addAccount(clientKey: number, accountName: string, amount: number) {
    return this.http.put('accounts', { clientKey, accountName, amount })
      .pipe(
        this.loaderService.useLoader
      );
  }

  getAccounts() {
    const clientKey = JSON.parse(localStorage.getItem('clientData')).clientKey;

    return this.http.get<AccountsResponseData[]>('accounts', {
      params: new HttpParams().set('clientKey', clientKey.toString())
    }).pipe(
      this.loaderService.useLoader
    );
  }

  deleteAccount(accountKey: number) {
    return this.http.delete('accounts', {
      params: new HttpParams().set('accountKey', accountKey.toString())
    }).pipe(
      this.loaderService.useLoader
    );
  }
}
