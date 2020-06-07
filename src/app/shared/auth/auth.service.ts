import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { UserResponseData } from '../response.model';
import { User, UserFiltered } from 'src/app/auth/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: UserFiltered;

  constructor(private http: HttpClient) {}

  registerUser(userForm: User) {
    this.userData = {
      name: userForm.name,
      username: userForm.user,
      password: userForm.password.password1
    };
    return this.http.post<UserResponseData>('register', this.userData);
  }

  login(loginForm) {
    // check if user exists and login user
  }
}
