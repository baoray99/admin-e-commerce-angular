import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// import { BehaviorSubject } from 'rxjs';
import { Product } from 'src/app/models/product.models';
import { ProductService } from 'src/app/services/product.service';
import { ProductDetailsComponent } from '../product-details/product-details.component';
import { NzTableLayout } from 'ng-zorro-antd/table';

@Component({
  selector: 'app-table-products',
  templateUrl: './table-products.component.html',
  styleUrls: ['./table-products.component.scss'],
})
export class TableProductsComponent implements OnInit {
  @ViewChild('product') product: ProductDetailsComponent;
  //dung viewchild de su dung cac ham trong component con
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {
    this.route.queryParamMap.subscribe((query) => {
      this.getProducts(query.get('id_category'));
    });
  }
  // visible: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  //dung behavior de bat dong bo visible cho component con
  listOfData: Product[];
  dataProduct: Product;
  nzTableLayout: NzTableLayout = 'auto';
  ngOnInit(): void {}
  getProducts(id: string) {
    this.productService
      .getLaptops(id)
      .subscribe((data) => (this.listOfData = data));
  }
  openDetails(data) {
    this.dataProduct = data;
    this.product.onOpen();
  }
}
