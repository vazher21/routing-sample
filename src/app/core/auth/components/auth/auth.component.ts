import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { IUser } from '@shared';
import { LoginData } from '../../models/login-interface';
import { tap } from 'rxjs';
import { UserService } from '../../../../shared/services';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  mode: 'register' | 'login' = 'login';

  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {}

  onRegister(data: IUser) {
    this.authService
      .register(data)
      .pipe(
        tap((res) => {
          if (res) {
            console.log('success');
            this.mode = 'login';
          }
        })
      )
      .subscribe();
  }

  onLogin(loginData: LoginData) {
    this.authService
      .login(loginData)
      .pipe(
        tap((v) => {
          if (v) {
            this.userService.logIn(v);
            this.router.navigateByUrl('currency');
            return;
          }
        })
      )
      .subscribe();
  }
}
