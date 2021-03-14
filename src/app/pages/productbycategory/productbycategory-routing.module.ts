import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductbycategoryComponent } from './productbycategory.component';

const routes: Routes = [
  {
    path: '',
    component: ProductbycategoryComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductbycategoryRoutingModule {}
