import { Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { filter, map, Observable, of, switchMap, tap, timer } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AsyncEmailValidator {
  constructor(private authService: AuthService) {}

  usernameValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return timer(250).pipe(
        switchMap(() => {
          if (!control.value) {
            // if empty
            return of(null);
          }
          return this.authService.isEmailTaken(control.value).pipe(
            map((res) => {
              return res ? { taken: true } : null;
            })
          );
        })
      );
    };
  }
}
