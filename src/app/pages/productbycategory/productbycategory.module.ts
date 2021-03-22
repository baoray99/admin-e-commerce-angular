import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ProductbycategoryRoutingModule } from './productbycategory-routing.module';
import { ProductbycategoryComponent } from './productbycategory.component';
import { TableProductsComponent } from '../../components/table-products/table-products.component';
import { ProductDetailsComponent } from '../../components/product-details/product-details.component';

import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzInputModule } from 'ng-zorro-antd/input';

@NgModule({
  declarations: [
    ProductbycategoryComponent,
    TableProductsComponent,
    ProductDetailsComponent,
  ],
  imports: [
    CommonModule,
    ProductbycategoryRoutingModule,
    NzTableModule,
    NzDividerModule,
    NzButtonModule,
    NzDrawerModule,
    NzCarouselModule,
    NzDescriptionsModule,
    NzIconModule,
    NzPopconfirmModule,
    NzMessageModule,
    NzInputModule,
    FormsModule
  ],
  exports: [ProductbycategoryComponent, NzIconModule],
  bootstrap: [TableProductsComponent],
})
export class ProductbycategoryModule {}
