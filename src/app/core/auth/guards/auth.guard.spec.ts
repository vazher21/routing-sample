import { TestBed } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';
import { AuthService } from '../services/auth.service';
import { dummyUser1 } from '../../../shared/mocks/dummy-users';
import { Observable, of } from 'rxjs';
import {
  ActivatedRouteSnapshot,
  Route,
  RouterStateSnapshot,
  UrlSegment,
} from '@angular/router';

describe('AuthGuard', () => {
  let guard: AuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService],
    });
    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  describe('canActivate', () => {
    it('should pass if user is logged in', (done) => {
      guard['userService'].loggedInUser$ = of(dummyUser1);
      const a = guard.canActivate(
        {} as ActivatedRouteSnapshot,
        {} as RouterStateSnapshot
      );
      (a as Observable<boolean>).subscribe((v) => {
        expect(v).toBeTruthy();
        done();
      });
    });
    it('should pass if user is logged in', (done) => {
      guard['userService'].loggedInUser$ = of(null);
      const a = guard.canActivate(
        {} as ActivatedRouteSnapshot,
        {} as RouterStateSnapshot
      );
      (a as Observable<boolean>).subscribe((v) => {
        expect(v).toBeFalse();
        done();
      });
    });
  });
  describe('canLoad', () => {
    it('should pass if user is logged in', (done) => {
      guard['userService'].loggedInUser$ = of(dummyUser1);
      const a = guard.canLoad({} as Route, [] as UrlSegment[]);
      (a as Observable<boolean>).subscribe((v) => {
        expect(v).toBeTruthy();
        done();
      });
    });
    it('should pass if user is logged in', (done) => {
      guard['userService'].loggedInUser$ = of(null);
      const a = guard.canLoad({} as Route, [] as UrlSegment[]);
      (a as Observable<boolean>).subscribe((v) => {
        expect(v).toBeFalse();
        done();
      });
    });
  });
});
