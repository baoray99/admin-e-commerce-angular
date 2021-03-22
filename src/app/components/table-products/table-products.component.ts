import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// import { BehaviorSubject } from 'rxjs';
import { Product } from 'src/app/models/product.models';
import { ProductService } from 'src/app/services/product.service';
import { ProductDetailsComponent } from '../product-details/product-details.component';
import { NzTableLayout } from 'ng-zorro-antd/table';
import { NzMessageService } from 'ng-zorro-antd/message';

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
    private productService: ProductService,
    private message: NzMessageService
  ) {
    this.route.queryParamMap.subscribe((query) => {
      this.loading = true;
      this.getProducts(query.get('id_category'));
    });
  }
  // visible: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  //dung behavior de bat dong bo visible cho component con
  listOfData: Product[];
  loading = false;
  dataProduct: Product;
  nzTableLayout: NzTableLayout = 'auto';
  ngOnInit(): void {}
  getProducts(id: string) {
    this.productService.getLaptops(id).subscribe((data) => {
      this.listOfData = data;
      this.loading = false;
    });
  }
  openDetails(data) {
    this.dataProduct = data;
    this.product.onOpen();
  }
  deleteSuccess() {
    this.message.success('Delete product successfully!');
  }
  confirm(id: string) {
    this.productService.deleteProduct(id).subscribe(
      (res) => {
        this.deleteSuccess();
        this.loading = true;
        this.getProducts(this.route.snapshot.queryParamMap.get('id_category'));
      },
      (error) => console.log('fail')
    );
  }
  cancel() {
    console.log('cancel');
  }
}
