import { TestBed } from '@angular/core/testing';

import { SalaryGuard } from './salary.guard';
import { UserService } from '../services';
import { Route, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { dummyUser1 } from '../mocks/dummy-users';

describe('SalaryGuard', () => {
  let guard: SalaryGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [UserService] });
    guard = TestBed.inject(SalaryGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
  it('should not let pass if user not logged in ', (done) => {
    guard['userService']['loggedInUserSubject$'].next(null);

    (
      guard.canLoad({} as Route, [] as UrlSegment[]) as Observable<boolean>
    ).subscribe((val) => {
      expect(val).toBeFalse();
      done();
    });
  });
  it('should  let pass if user  logged in ', (done) => {
    guard['userService']['loggedInUserSubject$'].next({
      ...dummyUser1,
      salary: 401,
    });

    (
      guard.canLoad({} as Route, [] as UrlSegment[]) as Observable<boolean>
    ).subscribe((val) => {
      expect(val).toBeTrue();
      done();
    });
  });
});
