import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { ClientService } from 'src/app/shared/clients/clients.service';
import { ClientResponseData } from 'src/app/shared/response.model';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'bg-bpm000',
  templateUrl: './bpm000.component.html',
  styleUrls: ['./bpm000.component.scss']
})
export class Bpm000Component implements OnInit, OnDestroy {
  showClients = false;
  clientsSearchForm: FormGroup;
  clients: ClientResponseData[];
  clientSubscription: Subscription;

  constructor(
    private clientService: ClientService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.clientsSearchForm = new FormGroup({
      firstName: new FormControl(null),
      lastName: new FormControl(null),
      clientKey: new FormControl(null)
    });

    this.clients = this.clientService.clients;
  }

  onClientSearch() {
    this.showClients = true;
    this.clientService.searchClient(this.clientsSearchForm.value);
    this.clientSubscription = this.clientService.clientsSubject.subscribe(
      (clients: ClientResponseData[]) => {
        this.clients = clients;
      }
    );
  }

  onAddClient() {
    this.router.navigate(['../bpm001'], { relativeTo: this.route });
  }

  onClickClient(index: number) {
    this.clientService.navigateToClient(index);
  }

  ngOnDestroy() {
    if (this.clientSubscription) {
      this.clientSubscription.unsubscribe();
    }
  }
}
