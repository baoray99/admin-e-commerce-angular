import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { Product } from '../models/product.models';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private httpClient: HttpClient) {}
  private static readonly apiURL =
    'https://dacnpm-test.herokuapp.com/products/?id_category=';
  errorHandle(error: HttpErrorResponse) {
    return throwError(error.message || 'Server Error');
  }
  getLaptops(id: string): Observable<Product[]> {
    return this.httpClient
      .get<Product[]>(ProductService.apiURL + id)
      .pipe(catchError(this.errorHandle));
  }
}
