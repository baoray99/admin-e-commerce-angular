import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Brand } from '../models/brand.models';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BrandService {
  private static readonly apiURL = 'https://dacnpm-test.herokuapp.com/brands';
  constructor(private httpClient: HttpClient) {}
  errorHandle(error: HttpErrorResponse) {
    return throwError(error.message || 'Server Error');
  }
  getBrands(): Observable<Brand[]> {
    return this.httpClient
      .get<Brand[]>(BrandService.apiURL)
      .pipe(catchError(this.errorHandle));
  }
}
