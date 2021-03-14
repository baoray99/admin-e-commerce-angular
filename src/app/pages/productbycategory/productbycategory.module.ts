import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

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
  ],
  exports: [ProductbycategoryComponent],
  bootstrap: [TableProductsComponent],
})
export class ProductbycategoryModule {}
