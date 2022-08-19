import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/services';
import { map, shareReplay } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  loggedIn$ = this.userService.loggedInUser$.pipe(
    map((user) => !!user),
    shareReplay(1)
  );
  displayCurrency$ = this.userService.loggedInUser$.pipe(
    map((user) => user && user.salary > 400)
  );
  constructor(private userService: UserService) {}

  ngOnInit(): void {}

  logout() {
    this.userService.logOut();
  }
}
