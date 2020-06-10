import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/shared/auth/auth.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'bg-shell-header',
  templateUrl: './shell-header.component.html',
  styleUrls: ['./shell-header.component.scss']
})
export class ShellHeaderComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onLogout() {
    this.authService.logout();
  }
}
