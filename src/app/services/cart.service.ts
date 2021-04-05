import { JsonpClientBackend } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../models/product.models';

@Injectable({
  providedIn: 'root',
})
export class CartService implements OnInit {
  private cart: Product[];
  private displaycartSubject: BehaviorSubject<Product[]> = new BehaviorSubject<
    Product[]
  >([]);

  cart$: Observable<Product[]> = this.displaycartSubject.asObservable();
  constructor() {}
  ngOnInit() {
    this.fetchData();
  }
  updateData() {
    this.displaycartSubject.next(this.cart);
  }
  fetchData() {
    this.cart = JSON.parse(window.localStorage.getItem('cart')) || [];
    this.updateData();
  }
  updateCart() {
    window.localStorage.setItem('cart', JSON.stringify(this.cart));
    this.updateData();
  }
  addToCart(item: Product) {
    this.cart.unshift(item);
    window.alert('Add to cart successfully !');
    this.updateCart();
  }
}
