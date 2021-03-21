import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/welcome' },
  {
    path: 'welcome',
    loadChildren: () =>
      import('./pages/welcome/welcome.module').then((m) => m.WelcomeModule),
  },
  {
    path: 'products',
    loadChildren: () =>
      import('./pages/productbycategory/productbycategory.module').then(
        (m) => m.ProductbycategoryModule
      ),
  },
  {
    path: 'product/edit',
    loadChildren: () =>
      import('./pages/edit-product-page/edit-product-page.module').then(
        (m) => m.EditProductPageModule
      ),
  },
  {
    path: 'product/add',
    loadChildren: () =>
      import('./pages/add-product-page/add-product-page.module').then(
        (m) => m.AddProductPageModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
