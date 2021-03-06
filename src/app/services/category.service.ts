import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Category } from '../models/category.models';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private static readonly apiURL =
    'https://dacnpm-test.herokuapp.com/categories';
  constructor(private httpClient: HttpClient) {}
  errorHandle(error: HttpErrorResponse) {
    return throwError(error.message || 'Server Error');
  }

  getCategories(): Observable<Category[]> {
    return this.httpClient
      .get<Category[]>(CategoryService.apiURL)
      .pipe(catchError(this.errorHandle));
  }
}
