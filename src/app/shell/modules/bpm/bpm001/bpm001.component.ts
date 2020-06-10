import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { ClientService } from 'src/app/shared/clients/clients.service';
import { Validators } from 'src/app/validation-message/bg-validators';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'bg-bpm001',
  templateUrl: './bpm001.component.html',
  styleUrls: ['./bpm001.component.scss']
})
export class Bpm001Component implements OnInit {
  clientForm: FormGroup;

  constructor(private clientService: ClientService) { }

  ngOnInit(): void {
    this.clientForm = new FormGroup({
      firstName: new FormControl(null, [Validators.required, Validators.maxLength(30), Validators.minLength(2)]),
      lastName: new FormControl(null, [Validators.required, Validators.maxLength(30), Validators.minLength(2)]),
      plus: new FormControl(null, [Validators.positive])
    });
  }

  onSubmit() {
    this.clientService.addClient(this.clientForm.value);
  }
}
