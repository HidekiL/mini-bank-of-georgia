import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject, Observable } from 'rxjs';

import { Client } from './client.model';
import { ClientResponseData } from 'src/app/shared/response.model';
import { LoaderService } from '../loader/loader.service';
import { AlertService } from '../alert/alert.service';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  clientsSubject = new Subject<ClientResponseData[]>();
  clientSubject = new Subject<number>();
  sumSubject = new Subject<number>();
  clients: ClientResponseData[];

  constructor(
    private http: HttpClient,
    private router: Router,
    private loaderService: LoaderService,
    private alertService: AlertService
  ) { }

  addClient(clientForm: Client) {
    const data = {
      firstName: clientForm.firstName,
      lastName: clientForm.lastName,
      plusPoints: clientForm.plus,
    };

    return this.http.put('clients', data).
      pipe(
        this.loaderService.useLoader
      ).
      subscribe(
        (response: ClientResponseData[]) => {
          // this.clientsSubject.next(this.getClients());
          this.alertService.showAlertMessage('კლიენტი წარმატებით დაემატა', 'success');
          this.router.navigate(['/bpm/bpm000']);
        }, error => {
          this.alertService.showAlertMessage(error.error, 'error');
        }
      );
  }

  searchClient(clientSearchForm) {
    const firstName = clientSearchForm.firstName;
    const lastName = clientSearchForm.lastName;
    const clientKey = clientSearchForm.clientKey;

    return this.http.get(
      'clients',
      {
        params: new HttpParams().
          set('firstName', firstName ? firstName : '').
          set('lastName', lastName ? lastName : '').
          set('clientKey', clientKey ? clientKey : '')
      }).
      pipe(
        this.loaderService.useLoader
      ).
      subscribe(
        (response: ClientResponseData[]) => {
          this.clients = response;
          this.clientsSubject.next(response);
        }, error => {
          this.alertService.showAlertMessage(error.error, 'error');
        }
      );
  }

  navigateToClient(index: number) {
    localStorage.setItem('clientData', JSON.stringify(this.getClientByIndex(index)));
    this.router.navigate(['/krn/krnicp']);
  }

  getClientByIndex(index: number) {
    return this.clients[index];
  }

  getClientByClientKey(clientKey: number) {
    return this.clients.forEach(item => {
      if (item.clientKey === clientKey) {
        return item;
      }
    });
  }

  getClients() {
    return this.clients;
  }
}
