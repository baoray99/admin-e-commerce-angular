import { JsonpClientBackend } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { PhotosApi } from '../models/photosapi.models';

@Injectable({
  providedIn: 'root',
})
export class CartService implements OnInit {
  private cart: PhotosApi[];
  private displaycartSubject: BehaviorSubject<
    PhotosApi[]
  > = new BehaviorSubject<PhotosApi[]>([]);

  cart$: Observable<PhotosApi[]> = this.displaycartSubject.asObservable();
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
  addToCart(item: PhotosApi) {
    this.cart.unshift(item);
    this.updateCart();
  }
}
