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
  array = [
    'https://lh3.googleusercontent.com/AXgapN8LC3uBkEns5j44gRzMOdkajwE2MUqXtbBEXGE-g4konoHxkfKo8566EADTDgv0U2iLp5a3yebNN0k7lPNOiHT6f5SQ=w1920-rw',
    'https://storage.googleapis.com/teko-gae.appspot.com/media/image/2021/3/24/20210324_605d7da3-f78e-4411-a52a-55eeeb754408.jpg',
    'https://lh3.googleusercontent.com/co6o531pxSg_zL589TTQHReI07caHOgsCQ4RiO0GyGIQLjvc3HjOvN0n3JquqLHUPrcYI-JRc606pqm75-LV4KuU4aDhtGml=w1920-rw',
  ];
  // array = [1, 2, 3, 4];
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
