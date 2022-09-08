import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import { RouterTestingModule } from '@angular/router/testing';
import { dummyUser1 } from '../mocks/dummy-users';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [RouterTestingModule] });
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login and update the stream', () => {
    const subject = service['loggedInUserSubject$'];
    const subjectSpy = spyOn(subject, 'next');

    service.logIn(dummyUser1);

    expect(subjectSpy).toHaveBeenCalledOnceWith(dummyUser1);
  });
  it('should logout and update the stream', () => {
    const subject = service['loggedInUserSubject$'];
    const subjectSpy = spyOn(subject, 'next');
    const routerSpy = spyOn(service['router'], 'navigateByUrl');

    service.logOut();

    expect(subjectSpy).toHaveBeenCalledOnceWith(null);
    expect(routerSpy).toHaveBeenCalledOnceWith('auth');
  });
});
