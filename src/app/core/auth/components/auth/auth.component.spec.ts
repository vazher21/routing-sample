import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthComponent } from './auth.component';
import { AuthRoutingModule } from '../../auth-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../../../shared/services';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoginComponent } from './login/login.component';
import { dummyUser1 } from '../../../../shared/mocks/dummy-users';
import { of, timer } from 'rxjs';

describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuthComponent, LoginComponent],
      imports: [
        AuthRoutingModule,
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientTestingModule,
      ],
      providers: [AuthService, UserService],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should register a new user', (done) => {
    const serviceRegisterMethodSpy = spyOn(
      component['authService'],
      'register'
    ).and.returnValue(of(dummyUser1));

    component.onRegister(dummyUser1);

    expect(serviceRegisterMethodSpy).toHaveBeenCalledOnceWith(dummyUser1);

    timer(100).subscribe(() => {
      expect(component.mode).toBe('login');
      done();
    });
  });

  it('should authenticate a registered user', (done) => {
    const serviceLoginMethodSpy = spyOn(
      component['authService'],
      'login'
    ).and.returnValue(of(dummyUser1));

    const userServiceLoginSpy = spyOn(
      component['userService'],
      'logIn'
    ).and.callThrough();

    const routerSpy = spyOn(component['router'], 'navigateByUrl');

    component.onLogin(dummyUser1);

    expect(serviceLoginMethodSpy).toHaveBeenCalledOnceWith(dummyUser1);

    timer(100).subscribe(() => {
      expect(userServiceLoginSpy).toHaveBeenCalledOnceWith(dummyUser1);
      expect(routerSpy).toHaveBeenCalledOnceWith('currency');
      done();
    });
  });
});
