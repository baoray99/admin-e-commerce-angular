import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderListPageComponent } from './order-list-page.component';

const routes: Routes = [{ path: '', component: OrderListPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderListPageRoutingModule {}
