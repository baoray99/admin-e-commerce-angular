import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category.models';
import { CategoryService } from 'src/app/services/category.service';
import { CartService } from 'src/app/services/cart.service';
import { HttpClient } from '@angular/common/http';
import { OwlOptions } from 'ngx-owl-carousel-o';
import 'lodash';
import { Product } from 'src/app/models/product.models';
import { ProductService } from 'src/app/services/product.service';
declare var _: any;

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {
  constructor(
    private categoryService: CategoryService,
    private readonly http: HttpClient,
    private cartService: CartService,
    private productService: ProductService
  ) {}
  customOptions: OwlOptions = {
    loop: false,
    autoplay: true,
    dots: false,
    autoWidth: true,
    nav: true,
    navText: ['<', '>'],
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 2,
      },
      1000: {
        items: 5,
      },
    },
  };
  categories: Category[];
  array = [1, 2, 3, 4];
  effect = 'scrollx';
  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((res) => {
      this.categories = res;
      this.categories.forEach((cate) => {
        this.productService.getLaptops(cate._id).subscribe((response) => {
          Object.defineProperty(cate, 'randomProduct', {
            value: _.sampleSize(response, 10),
            writable: false,
          });
        });
      });
    });
  }

  addToCart(item: Product) {
    this.cartService.addToCart(item);
  }
}
