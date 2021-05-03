import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientComponent } from './client.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/client/homepage' },
  {
    path: '',
    component: ClientComponent,
    children: [
      {
        path: 'homepage',
        loadChildren: () =>
          import('../../pages/homepage/homepage.module').then(
            (m) => m.HomepageModule
          ),
      },
      {
        path: 'product',
        loadChildren: () =>
          import(
            '../../pages/product-details-client/product-details-client.module'
          ).then((m) => m.ProductDetailsClientModule),
      },
      {
        path: 'cart',
        loadChildren: () =>
          import('../../pages/cart-page/cart-page.module').then(
            (m) => m.CartPageModule
          ),
      },
      {
        path: 'products',
        loadChildren: () =>
          import(
            '../../pages/products-by-category/products-by-category.module'
          ).then((m) => m.ProductsByCategoryModule),
      },
      {
        path: 'login',
        loadChildren: () =>
          import('../../pages/login-page/login-page.module').then(
            (m) => m.LoginPageModule
          ),
      },
      {
        path: 'register',
        loadChildren: () =>
          import('../../pages/register-page/register-page.module').then(
            (m) => m.RegisterPageModule
          ),
      },
      {
        path: 'order',
        loadChildren: () =>
          import('../../pages/order-list-page/order-list-page.module').then(
            (m) => m.OrderListPageModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientRoutingModule {}
