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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientRoutingModule {}
