import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { ClientResponseData } from 'src/app/shared/response.model';
import { ClientService } from 'src/app/shared/clients/clients.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'bg-client-header',
  templateUrl: './client-header.component.html',
  styleUrls: ['./client-header.component.scss']
})
export class ClientHeaderComponent implements OnInit, OnDestroy {
  client: ClientResponseData;
  sumAmount: Promise<number>;
  sumSubscription: Subscription;
  sumAm: number;

  constructor(private router: Router, private clientService: ClientService) {
  }

  ngOnInit(): void {
    this.client = JSON.parse(localStorage.getItem('clientData'));
    this.sumAm = this.client.sumAmount;
    this.sumAmount = new Promise(
      resolve => {
        console.log('resolved amount');
        resolve(this.sumAm);
      }
    );

    this.sumSubscription = this.clientService.sumSubject.subscribe((newAmount) => {
      this.sumAmount = new Promise(
        resolve => {
          this.client.sumAmount = this.sumAm + newAmount;
          console.log(this.sumAm);
          console.log(newAmount);
          console.log(this.client.sumAmount);
          localStorage.setItem('clientData', JSON.stringify(this.client));
          resolve(this.client.sumAmount);
        }
      );
    }
    );
  }

  onClientLogout() {
    localStorage.removeItem('clientData');
    this.router.navigate(['/bpm/bpm000']);
  }

  ngOnDestroy() {
    if (this.sumSubscription) {
      this.sumSubscription.unsubscribe();
    }
  }
}
