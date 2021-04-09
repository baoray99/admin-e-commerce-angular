import { JsonpClientBackend } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../models/product.models';

@Injectable({
  providedIn: 'root',
})
export class CartService implements OnInit {
  private cart: Product[];
  private totalCost: number = 0;
  private displaycartSubject: BehaviorSubject<Product[]> = new BehaviorSubject<
    Product[]
  >([]);
  private totalCostSubject: BehaviorSubject<number> = new BehaviorSubject<number>(
    0
  );
  cart$: Observable<Product[]> = this.displaycartSubject.asObservable();
  totalCost$: Observable<number> = this.totalCostSubject.asObservable();
  constructor() {}
  ngOnInit() {
    this.fetchData();
  }
  updateData() {
    this.displaycartSubject.next(this.cart);
    this.totalCostSubject.next(this.totalCost);
  }
  fetchData() {
    this.cart = JSON.parse(window.localStorage.getItem('cart')) || [];
    this.totalCost = JSON.parse(window.localStorage.getItem('totalCost')) || 0;
    this.updateData();
  }
  updateCart() {
    window.localStorage.setItem('cart', JSON.stringify(this.cart));
    window.localStorage.setItem('totalCost', JSON.stringify(this.totalCost));
    this.updateData();
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
