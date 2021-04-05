import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductDetailsClientRoutingModule } from './product-details-client-routing.module';
import { ProductDetailsClientComponent } from './product-details-client.component';


@NgModule({
  declarations: [ProductDetailsClientComponent],
  imports: [
    CommonModule,
    ProductDetailsClientRoutingModule
  ]
})
export class ProductDetailsClientModule { }
