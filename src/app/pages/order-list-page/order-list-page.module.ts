import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderListPageRoutingModule } from './order-list-page-routing.module';
import { OrderListPageComponent } from './order-list-page.component';

import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { ItemDetailsComponent } from 'src/app/components/item-details/item-details.component';
@NgModule({
  declarations: [OrderListPageComponent, ItemDetailsComponent],
  imports: [
    CommonModule,
    OrderListPageRoutingModule,
    NzTableModule,
    NzDividerModule,
    NzDrawerModule,
    NzButtonModule
  ],
})
export class OrderListPageModule {}
