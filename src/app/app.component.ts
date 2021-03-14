import { Component, OnInit } from '@angular/core';
import { Category } from './models/category.models';
import { CategoryService } from './services/category.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  isCollapsed = false;
  categories: Category[];
  constructor(private categoryService: CategoryService) {}
  ngOnInit() {
    this.getCategories();
  }
  getCategories() {
    this.categoryService
      .getCategories()
      .subscribe((data) => (this.categories = data));
  }
}
