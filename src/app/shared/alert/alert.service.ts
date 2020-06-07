import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  showAlert = false;
  alertMessage: string;
  messageType: string;

  showAlertMessage(message: string, messageType: string) {
    this.alertMessage = message;
    this.messageType = messageType;
    this.showAlert = true;
  }
}
