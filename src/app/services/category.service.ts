import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/category.models';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private httpClient: HttpClient) {}
  private static readonly apiURL =
    'https://dacnpm-test.herokuapp.com/categories';
  getCategories(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(CategoryService.apiURL);
  }
}
