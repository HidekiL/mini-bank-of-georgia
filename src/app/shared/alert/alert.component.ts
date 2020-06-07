import { Component, OnInit } from '@angular/core';
import { AlertService } from './alert.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'bg-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {

  constructor(public alert: AlertService) { }

  ngOnInit(): void {
  }

  hideAlert() {
    this.alert.showAlert = false;
  }

}
