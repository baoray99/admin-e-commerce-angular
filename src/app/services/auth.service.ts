import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

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
  getMe(token: any): Observable<any> {
    return this.httpClient
      .get<any>('https://dacnpm-test.herokuapp.com/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .pipe(catchError(this.errorHandle));
  }
}
