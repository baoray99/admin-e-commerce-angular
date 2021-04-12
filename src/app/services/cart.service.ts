import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../models/product.models';
import { takeLast } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CartService implements OnInit {
  private cart: Product[];
  private totalCost: number = 0;
  private seenProduct: Product[];
  private displaycartSubject: BehaviorSubject<Product[]> = new BehaviorSubject<
    Product[]
  >([]);
  private totalCostSubject: BehaviorSubject<number> = new BehaviorSubject<number>(
    0
  );
  private displayseenproductSubject: BehaviorSubject<
    Product[]
  > = new BehaviorSubject<Product[]>([]);
  cart$: Observable<Product[]> = this.displaycartSubject.asObservable();
  totalCost$: Observable<number> = this.totalCostSubject.asObservable();
  seenProduct$: Observable<
    Product[]
  > = this.displayseenproductSubject.asObservable();
  constructor() {}
  ngOnInit() {
    this.fetchData();
  }
  updateData() {
    this.displaycartSubject.next(this.cart);
    this.totalCostSubject.next(this.totalCost);
  }
  updateSeen() {
    this.displayseenproductSubject.next(this.seenProduct);
  }
  fetchData() {
    this.cart = JSON.parse(window.localStorage.getItem('cart')) || [];
    this.totalCost = JSON.parse(window.localStorage.getItem('totalCost')) || 0;
    this.seenProduct =
      JSON.parse(window.localStorage.getItem('seen-product')) || [];
    this.updateData();
    this.updateSeen();
    // this.seenProduct$.pipe(takeLast(6));
  }
  updateCart() {
    window.localStorage.setItem('cart', JSON.stringify(this.cart));
    window.localStorage.setItem('totalCost', JSON.stringify(this.totalCost));
    this.updateData();
  }
  updateSeenProduct() {
    window.localStorage.setItem(
      'seen-product',
      JSON.stringify(this.seenProduct)
    );
    this.updateSeen();
  }
  addToSeenProduct(item: Product) {
    if (this.seenProduct.some((data) => data.name === item.name)) {
      console.log('existed');
      this.updateSeenProduct();
    } else {
      console.log('not exist');
      this.seenProduct.unshift(item);
      if (this.seenProduct.length > 6) {
        this.seenProduct.splice(6, 1);
      }
      this.updateSeenProduct();
    }
  }
  addToCart(item: Product) {
    if (this.cart.includes(item)) {
      this.cart.forEach((prod) => {
        if (prod.name.includes(item.name)) {
          prod.count += 1;
          if (item.price !== null) {
            this.totalCost += parseInt(item.price);
          }
          window.alert('Add to cart successfully !');
          this.updateCart();
        }
      });
    } else {
      item.count = 1;
      this.cart.unshift(item);
      if (item.price !== null) {
        this.totalCost += parseInt(item.price);
      }
      window.alert('Add to cart successfully !');
      this.updateCart();
    }
  }
  deleteItem(data: Product) {
    this.totalCost -= data.count * parseInt(data.price);
    const index = this.cart.indexOf(data);
    this.cart.splice(index, 1);
    this.updateCart();
  }
  updateCost(data: Product) {
    const index = this.cart.findIndex((item) => item._id === data._id);
    const itemTemp = this.cart[index];
    itemTemp.count = data.count;
    this.cart.splice(index, 1, itemTemp); // xoa 1 phan tu va thay the bang phan tu moi
    this.totalCost = 0;
    this.cart.forEach((item) => {
      this.totalCost += parseInt(item.price) * item.count;
    });
    this.updateCart();
  }
}
