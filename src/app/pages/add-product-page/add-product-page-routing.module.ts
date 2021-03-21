import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddProductPageComponent } from './add-product-page.component';

const routes: Routes = [{ path: '', component: AddProductPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddProductPageRoutingModule {}
