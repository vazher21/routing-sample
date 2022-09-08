import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { By } from '@angular/platform-browser';
import { AsyncEmailValidator } from '../../../validators/email.validator';
import { of } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [ReactiveFormsModule],
      providers: [
        {
          provide: AsyncEmailValidator,
          useValue: { usernameValidator: () => () => of(null) },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
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
    component.form.get('name')?.setValue('name');
    component.form.get('salary')?.setValue(600);

    fixture.detectChanges();

    expect(
      fixture.debugElement.query(By.css('button')).nativeElement.disabled
    ).toBeFalsy();
  });

  it('should emit register  when form is submitted', () => {
    const emitterSpy = spyOn(component.registered, 'emit');

    component.form.get('email')?.setValue('email@gmail.com');
    component.form.get('password')?.setValue('Aa23456');
    component.form.get('name')?.setValue('name');
    component.form.get('salary')?.setValue(600);

    component.onSubmit();

    expect(emitterSpy).toHaveBeenCalledOnceWith({
      email: 'email@gmail.com',
      password: 'Aa23456',
      salary: 600,
      name: 'name',
    });
  });
});
