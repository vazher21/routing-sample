import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IUser } from '@shared';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AsyncEmailValidator } from '../../../validators/email.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  @Output() registered = new EventEmitter<IUser>();

  form = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl(
      '',
      [Validators.required, Validators.email],
      [this.asyncEmailValidator.usernameValidator()]
    ),
    salary: new FormControl(0, Validators.required),
    password: new FormControl('', Validators.required),
  });

  constructor(private asyncEmailValidator: AsyncEmailValidator) {}

  ngOnInit(): void {}

  onSubmit() {
    this.registered.emit(this.form.getRawValue() as IUser);
  }

  get email() {
    return this.form.get('email') as FormControl;
  }
}
