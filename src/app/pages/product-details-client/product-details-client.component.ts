import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product.models';
import { ProductService } from 'src/app/services/product.service';
import { CartService } from 'src/app/services/cart.service';
import 'lodash';
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
    private cartService: CartService,
    private router: Router
  ) {
    // this.route.queryParamMap.subscribe((query) => {
    //   const id = query.get('id');
    //   this.router.navigate([`/client/product?id=${{ id }}`]);
    // });
  }
  lodash = _;
  product: Product;
  displayImg: string;
  keys = [];
  ngOnInit(): void {
    this.getProductById(this.route.snapshot.queryParamMap.get('id'));
  }
  getProductById(id) {
    this.productService.getProductById(id).subscribe((res) => {
      this.product = res;
      this.displayImg = res.image[0];
      this.keys = this.lodash.sampleSize(
        Object.keys(this.product?.product_detail),
        6
      );
      this.cartService.addToSeenProduct(res);
    });
  }
  setImage(img: string) {
    this.displayImg = img;
  }
  addToCart(item: Product) {
    this.cartService.addToCart(item);
  }
}
