import { Injectable } from '@angular/core';
import { BackendService } from './backend.service';
import { IUser } from '@shared';
import { LoginData } from '../models/login-interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private backendService: BackendService) {}

  register(user: IUser) {
    return this.backendService.register(user);
  }

  login(loginData: LoginData) {
    return this.backendService.authenticate(loginData);
  }

  isEmailTaken(email: string) {
    return this.backendService.isEmailTaken(email);
  }
}
