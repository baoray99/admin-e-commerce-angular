import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-details-client',
  templateUrl: './product-details-client.component.html',
  styleUrls: ['./product-details-client.component.scss'],
})
export class ProductDetailsClientComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}
  name = '';
  ngOnInit(): void {
    this.productService
      .getProductById(this.route.snapshot.queryParamMap.get('id'))
      .subscribe((res) => {
        this.name = res.name;
      });
  }
}
