import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product.models';
import { ProductService } from 'src/app/services/product.service';
import 'lodash';
declare var _: any;
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from 'src/app/services/cart.service';
import { BrandService } from 'src/app/services/brand.service';
import { Brand } from 'src/app/models/brand.models';

@Component({
  selector: 'app-products-by-category',
  templateUrl: './products-by-category.component.html',
  styleUrls: ['./products-by-category.component.scss'],
})
export class ProductsByCategoryComponent implements OnInit {
  constructor(
    private productServices: ProductService,
    private route: ActivatedRoute,
    private cartService: CartService,
    private brandService: BrandService
  ) {}
  customOptions: OwlOptions = {
    loop: false,
    autoplay: false,
    dots: false,
    autoWidth: true,
    nav: false,
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
  products: Product[];
  tempProducts: Product[];
  pageIndex: number = 1;
  startProduct = 0;
  endProduct = 20;
  brands: Brand[];
  selectedValue = null;
  rows: number[] = [1, 2, 3, 4];
  ngOnInit(): void {
    this.getProducts();
    this.brandService.getBrands().subscribe((res) => {
      this.brands = res;
    });
  }
  getProducts() {
    this.productServices
      .getLaptops(this.route.snapshot.queryParamMap.get('id_category'))
      .subscribe((res) => {
        this.products = res;
        this.paginationProduct(this.startProduct, this.endProduct);
      });
  }
  paginationProduct(start: number, end: number) {
    this.tempProducts = _.slice(this.products, start, end);
  }
  changeIndex(index) {
    if (index - this.pageIndex > 0) {
      this.startProduct += 20;
      this.endProduct += 20;
      this.paginationProduct(this.startProduct, this.endProduct);
    } else {
      this.startProduct -= 20;
      this.endProduct -= 20;
      this.paginationProduct(this.startProduct, this.endProduct);
    }
    this.pageIndex = index;
  }
  addToCart(item: Product) {
    this.cartService.addToCart(item);
  }
  filterBrand(event) {
    if (this.selectedValue !== null) {
      this.products = this.products.filter((data) => data.brand._id == event);
      this.paginationProduct(this.startProduct, this.endProduct);
    } else {
      this.getProducts();
    }
  }
}
