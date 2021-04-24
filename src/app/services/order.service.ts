import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Order } from '../models/order.models';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private url = 'https://dacnpm-test.herokuapp.com/orders/';
  constructor(private httpClient: HttpClient) {}
  errorHandle(error: HttpErrorResponse) {
    return throwError(error.message || 'Server Error');
  }
  postOrder(data: any): Observable<any> {
    return this.httpClient
      .post<any>(this.url, data)
      .pipe(catchError(this.errorHandle));
  }
}
