import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ClientService } from 'src/app/shell/shared/clients/clients.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'bg-bpm000',
  templateUrl: './bpm000.component.html',
  styleUrls: ['./bpm000.component.scss']
})
export class Bpm000Component implements OnInit {
  showClients = false;
  clientsSearchForm: FormGroup;
  clients;

  constructor(private clientService: ClientService) { }

  ngOnInit(): void {
    this.clientsSearchForm = new FormGroup({
      firstName: new FormControl(null),
      lastName: new FormControl(null),
      clientKey: new FormControl(null)
    })

    this.clients = this.clientService.clients;
  }

  onClientSearch() {
    this.showClients = true;
    this.clientService.searchClient(this.clientsSearchForm.value).subscribe(
      clients => {
        this.clients = clients;
      }
    );
  }
}
