import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { map, Observable, take } from 'rxjs';
import { UserService } from '../services';

@Injectable({
  providedIn: 'root',
})
export class SalaryGuard implements CanLoad {
  constructor(private userService: UserService) {}

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.userService.loggedInUser$.pipe(
      map((user) => !!user && user.salary > 400)
    );
  }
}
