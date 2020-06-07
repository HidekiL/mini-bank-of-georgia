import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  clients = [
    {
      firstName: 'test1',
      lastName: 'test1',
      clientKey: '1'
    },
    {
      firstName: 'test2',
      lastName: 'test2',
      clientKey: '2'
    }
  ];

  constructor(private http: HttpClient) { }

  addClient(clientForm) {

  }

  searchClient(clientSearchForm) {
    const firstName = clientSearchForm.firstName;
    const lastName = clientSearchForm.lastName;
    const clientKey = clientSearchForm.clientKey;

    return this.http.post(
      'clients',
      {},
      {
        params: new HttpParams().
          set('firstName', firstName).
          set('lastName', lastName).
          set('clientKey', clientKey)
      });
  }

  getClient(index: number) {
    return this.clients[index];
  }

  getClients() {
    return this.clients;
  }

}