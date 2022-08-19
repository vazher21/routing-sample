import { Injectable } from '@angular/core';
import { BehaviorSubject, shareReplay } from 'rxjs';
import { IUser } from '@shared';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private loggedInUserSubject$ = new BehaviorSubject<IUser | null>(null);
  loggedInUser$ = this.loggedInUserSubject$.pipe(shareReplay(1));

  constructor(private router: Router) {}

  logIn(user: IUser) {
    this.loggedInUserSubject$.next(user);
  }

  logOut() {
    this.loggedInUserSubject$.next(null);
    this.router.navigateByUrl('auth');
  }
}
