import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { AuthService } from '../../auth/services/auth.service';
import { dummyUser1 } from '../../../shared/mocks/dummy-users';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      providers: [AuthService],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call services logout methodn on logout', () => {
    const logoutSpy = spyOn(component['userService'], 'logOut');
    component.logout();
    expect(logoutSpy).toHaveBeenCalled();
  });

  it('should hide displayCurrency$ based on users salary', (done) => {
    //
    const poorestGuyAlive = { ...dummyUser1, salary: 1 };
    component['userService']['loggedInUserSubject$'].next(poorestGuyAlive);
    component.displayCurrency$.subscribe((v) => {
      expect(v).toBeFalse();
      done();
    });
  });
  it('should show displayCurrency$ based on users salary', (done) => {
    //
    const richestGuyAlive = { ...dummyUser1, salary: 501 };
    component['userService']['loggedInUserSubject$'].next(richestGuyAlive);
    component.displayCurrency$.subscribe((v) => {
      expect(v).toBeTrue();
      done();
    });
  });
});
