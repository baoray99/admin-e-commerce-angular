import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product.models';
import { CartService } from 'src/app/services/cart.service';

interface ItemData {
  id: string;
  name: string;
  age: string;
  address: string;
}
@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss'],
})
export class CartPageComponent implements OnInit {
  constructor(private cartService: CartService) {}
  loading = false;
  editId: string | null = null;
  cart$: Observable<any[]>;
  totalCost$: Observable<number>;

  startEdit(id: string): void {
    this.editId = id;
  }
  stopEdit(data: Product): void {
    this.editId = null;
    this.cartService.updateCost(data);  
  }
  deleteRow(data:Product): void {
    this.cartService.deleteItem(data);
    this.cartService.fetchData();
  }

  ngOnInit(): void {
    this.cartService.fetchData();
    this.cart$ = this.cartService.cart$;
    this.totalCost$ = this.cartService.totalCost$;
  }
}
