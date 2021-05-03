import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemDetailsComponent } from 'src/app/components/item-details/item-details.component';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-list-page',
  templateUrl: './order-list-page.component.html',
  styleUrls: ['./order-list-page.component.scss'],
})
export class OrderListPageComponent implements OnInit {
  @ViewChild('items') items: ItemDetailsComponent;
  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService
  ) {}
  listOrder: any[];
  orderItems: any[];
  loading=false;
  ngOnInit(): void {
    this.loading=true
    this.orderService
      .getOrdersById(this.route.snapshot.queryParamMap.get('id_user'))
      .subscribe((res) => {
        this.listOrder = res;
        this.loading=false
      });
  }
  openItemDetails(data: any) {
    this.orderItems = data;
    this.items.open();
  }
}
