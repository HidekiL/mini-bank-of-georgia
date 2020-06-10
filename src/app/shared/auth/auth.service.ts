import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

import { UserResponseData } from '../response.model';
import { LoaderService } from '../loader/loader.service';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = new BehaviorSubject<User>(null);
  private timer: any;

  constructor(
    private http: HttpClient,
    private loaderService: LoaderService,
    private router: Router
  ) { }

  registerUser(name: string, username: string, password: string) {
    return this.http.post<UserResponseData>('register', { name, username, password }).pipe(
      this.loaderService.useLoader,
      tap((response) => {
        this.handleAuth(response);
      })
    );
  }

  login(username: string, password: string) {
    return this.http.post<UserResponseData>('login', { username, password }).pipe(
      this.loaderService.useLoader,
      tap((response) => this.handleAuth(response))
    );
  }

  autoLogin() {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }
    const user = new User(
      userData.name,
      userData.username,
      userData.image,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );
    if (user.token) {
      this.user.next(user);
    }
    this.autoLogout(
      new Date(userData._tokenExpirationDate).getTime() - new Date().getTime()
    );
  }

  autoLogout(expirationDuration: number) {
    this.timer = setTimeout(
      () => this.logout(),
      Math.min(2147483647, expirationDuration)
    );
  }

  logout() {
    this.user.next(undefined);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if (this.timer) {
      clearTimeout(this.timer);
    }
    this.timer = undefined;
  }

  handleAuth = (response: UserResponseData) => {
    const user = new User(
      response.name,
      response.username,
      response.image,
      response.token,
      new Date(response.expirationDate)
    );
    this.user.next(user);
    localStorage.setItem('userData', JSON.stringify(user));
    this.autoLogout(response.expirationDate - new Date().getTime());
  }
}
