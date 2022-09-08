import { ComponentFixture, getTestBed, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should disable button before form is valid', () => {
    expect(
      fixture.debugElement.query(By.css('button')).nativeElement.disabled
    ).toBeTruthy();

    component.form.get('email')?.setValue('email@gmail.com');
    component.form.get('password')?.setValue('Aa23456');

    fixture.detectChanges();

    expect(
      fixture.debugElement.query(By.css('button')).nativeElement.disabled
    ).toBeFalsy();
  });

  it('should emit login when form is submitted', () => {
    const emitterSpy = spyOn(component.logIn, 'emit');

    component.form.get('email')?.setValue('email@gmail.com');
    component.form.get('password')?.setValue('Aa23456');

    component.onSubmit();

    expect(emitterSpy).toHaveBeenCalledOnceWith({
      email: 'email@gmail.com',
      password: 'Aa23456',
    });
  });
});
