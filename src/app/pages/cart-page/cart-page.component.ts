import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product.models';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss'],
})
export class CartPageComponent implements OnInit {
  constructor(
    private cartService: CartService,
    private fb: FormBuilder,
    private authService: AuthService,
    private orderService: OrderService
  ) {}
  loading = false;
  editId: string | null = null;
  cart$: Observable<any[]>;
  totalCost$: Observable<number>;
  isVisible = false;
  validateForm!: FormGroup;
  isToken: boolean = false;
  userPhone: string = '';
  orderItem: any[];
  totalPrice: number;
  userId: string;
  submitForm(): void {
    this.loading = true;
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    if (this.validateForm.valid) {
      this.authService
        .login(
          this.validateForm.value.userName,
          this.validateForm.value.password
        )
        .subscribe((res) => {
          this.isToken = true;
          window.localStorage.setItem('token', JSON.stringify(res.accessToken));
          this.authService.fetchUser();
          this.loading = false;
          this.isVisible = false;
        });
    }
  }
  submitCart() {
    const order = {
      id_user: this.userId,
      totalPrice: this.totalPrice,
      customer_phone: this.userPhone,
      items: this.orderItem,
    };
    this.orderService.postOrder(order).subscribe(
      (res) => {
        window.alert('Thanh toán thành công');
        this.cartService.submitedCart();
      },
      (error) => {
        window.alert('Thanh toán thất bại');
      }
    );
  }
  handleOk(): void {
    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  startEdit(id: string): void {
    this.editId = id;
  }
  stopEdit(data: Product): void {
    if (data.count <= 0 || data.count > data.quantity) {
      window.alert('Số lượng vượt quá kho hoặc bằng 0 !');
      this.startEdit(data._id);
    } else {
      this.editId = null;
      this.cartService.updateCost(data);
    }
  }
  deleteRow(data: Product): void {
    this.cartService.deleteItem(data);
    this.cartService.fetchData();
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true],
    });
    if (window.localStorage.getItem('token')) {
      this.isToken = true;
    }
    this.cartService.fetchData();
    this.cart$ = this.cartService.cart$;
    this.totalCost$ = this.cartService.totalCost$;
    this.cart$.subscribe((res) => {
      this.orderItem = res.map((item) => {
        return {
          ...{ id_product: item._id, quantity: item.count, price: item.price },
        };
      });
    });
    this.totalCost$.subscribe((res) => (this.totalPrice = res));
    this.authService.userID$.subscribe(res=>{ this.userId=res})
  }
  openModalSubmit() {
    this.isVisible = true;
  }
}
