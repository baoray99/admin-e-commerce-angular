import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'welcome',
        loadChildren: () =>
          import('../../pages/welcome/welcome.module').then(
            (m) => m.WelcomeModule
          ),
      },
      {
        path: 'products',
        loadChildren: () =>
          import('../../pages/productbycategory/productbycategory.module').then(
            (m) => m.ProductbycategoryModule
          ),
      },
      {
        path: 'product/edit',
        loadChildren: () =>
          import('../../pages/edit-product-page/edit-product-page.module').then(
            (m) => m.EditProductPageModule
          ),
      },
      {
        path: 'product/add',
        loadChildren: () =>
          import('../../pages/add-product-page/add-product-page.module').then(
            (m) => m.AddProductPageModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
