import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product.models';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products-by-category',
  templateUrl: './products-by-category.component.html',
  styleUrls: ['./products-by-category.component.scss'],
})
export class ProductsByCategoryComponent implements OnInit {
  constructor(
    private productServices: ProductService,
    private route: ActivatedRoute
  ) {}
  products: Product[];
  ngOnInit(): void {
    this.productServices
      .getLaptops(this.route.snapshot.queryParamMap.get('id_category'))
      .subscribe((res) => {
        this.products = res;
      });
  }
}
