import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../models/user.models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}
  private user: User;
  private userID: string;
  private userSubject: BehaviorSubject<User> = new BehaviorSubject<User>(null);
  private userIdSubject: BehaviorSubject<string> = new BehaviorSubject<string>(
    ''
  );
  user$: Observable<User> = this.userSubject.asObservable();
  userID$: Observable<string> = this.userIdSubject.asObservable();
  updateData() {
    this.userSubject.next(this.user);
    this.userIdSubject.next(this.userID);
  }
  fetchUser() {
    this.getMe().subscribe(
      (res) => ((this.user = res), (this.userID = res._id), this.updateData()),
      (error) => ((this.user = null), (this.userID = ''))
    );
  }
  errorHandle(error: HttpErrorResponse) {
    return throwError(error.message || 'Server Error');
  }
  login(email: string, password: string): Observable<any> {
    return this.httpClient
      .post<any>('https://dacnpm-test.herokuapp.com/login', {
        username: email,
        password: password,
      })
      .pipe(catchError(this.errorHandle));
  }
  getMe(/*token: any*/): Observable<any> {
    return this.httpClient
      .get<any>(
        'https://dacnpm-test.herokuapp.com/me' /*{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }*/
      )
      .pipe(catchError(this.errorHandle));
  }
}
