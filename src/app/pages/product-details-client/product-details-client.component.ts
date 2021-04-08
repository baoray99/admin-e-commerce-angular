import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product.models';
import { ProductService } from 'src/app/services/product.service';
import 'lodash';
import { CartService } from 'src/app/services/cart.service';
declare var _: any;

@Component({
  selector: 'app-product-details-client',
  templateUrl: './product-details-client.component.html',
  styleUrls: ['./product-details-client.component.scss'],
})
export class ProductDetailsClientComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService
  ) {}
  lodash = _;
  product: Product;
  displayImg: string;
  keys = [];
  ngOnInit(): void {
    this.productService
      .getProductById(this.route.snapshot.queryParamMap.get('id'))
      .subscribe((res) => {
        this.product = res;
        this.displayImg = res.image[0];
        this.keys = this.lodash.sampleSize(
          Object.keys(this.product.product_detail),
          6
        );
      });
  }
  setImage(img: string) {
    this.displayImg = img;
  }
  addToCart(item: Product) {
    this.cartService.addToCart(item);
  }
}
