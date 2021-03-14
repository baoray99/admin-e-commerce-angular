import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.models';
import  'lodash';
declare var _:any;
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent {
  // @Input('visible')
  // _visible: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  @Input('data')
  set data(data: Product) {
    this._data = data;
    data && (this.keys = Object.keys(data.product_detail));
  }
  get data() {
    return this._data;
  }
  private _data: Product;
  // dung get set de gen du lieu lien tuc
  constructor() {}
  lodash=_;
  visible = false;
  keys = [];
  onOpen() {
    this.visible = true;
  }
  onClose() {
    this.visible = false;
  }
}
