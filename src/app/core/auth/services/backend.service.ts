import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { LoginData } from '../models/login-interface';
import { IUser } from '@shared';

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  baseUrl = 'http://localhost:3000';
  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(this.baseUrl + '/employees');
  }

  register(user: IUser): Observable<IUser> {
    return this.http.post<IUser>(this.baseUrl + '/employees', user);
  }

  authenticate(user: LoginData): Observable<IUser | undefined> {
    return this.getAllUsers().pipe(
      map((users) =>
        users.find(
          (regUser) =>
            regUser.email === user.email && regUser.password === user.password
        )
      )
    );
  }

  isEmailTaken(email: string): Observable<boolean> {
    return this.getAllUsers().pipe(
      map((users) => users.some((user) => user.email === email))
    );
  }
}
