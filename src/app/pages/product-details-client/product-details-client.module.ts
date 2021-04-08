import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductDetailsClientRoutingModule } from './product-details-client-routing.module';
import { ProductDetailsClientComponent } from './product-details-client.component';
import { IconsProviderModule } from '../../icons-provider.module';

@NgModule({
  declarations: [ProductDetailsClientComponent],
  imports: [
    CommonModule,
    ProductDetailsClientRoutingModule,
    IconsProviderModule
  ]
})
export class ProductDetailsClientModule { }
