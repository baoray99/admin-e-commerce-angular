import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductDetailsClientComponent } from './product-details-client.component';

const routes: Routes = [{ path: '', component: ProductDetailsClientComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductDetailsClientRoutingModule {}
