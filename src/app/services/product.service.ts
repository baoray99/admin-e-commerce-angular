import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Product } from '../models/product.models';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private httpClient: HttpClient) {}
  private static readonly apiURL =
    'https://dacnpm-test.herokuapp.com/products/?id_category=';
  private static readonly apiGetById =
    'https://dacnpm-test.herokuapp.com/products/';
  errorHandle(error: HttpErrorResponse) {
    return throwError(error.message || 'Server Error');
  }
  getLaptops(id: string): Observable<Product[]> {
    return this.httpClient
      .get<Product[]>(ProductService.apiURL + id)
      .pipe(catchError(this.errorHandle));
  }
  getProductById(id: string): Observable<Product> {
    return this.httpClient
      .get<Product>(ProductService.apiGetById + id)
      .pipe(catchError(this.errorHandle));
  }
  updateProduct(id: string, data: any): Observable<Product> {
    return this.httpClient
      .put<Product>(ProductService.apiGetById + id, data)
      .pipe(catchError(this.errorHandle));
  }
  addProduct(data: any): Observable<Product> {
    return this.httpClient
      .post<Product>(ProductService.apiGetById, data)
      .pipe(catchError(this.errorHandle));
  }
  deleteProduct(id: string): Observable<Product> {
    return this.httpClient
      .delete<Product>(ProductService.apiGetById + id)
      .pipe(catchError(this.errorHandle));
  }
}
