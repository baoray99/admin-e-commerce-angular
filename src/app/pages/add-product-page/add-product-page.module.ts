import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzMessageModule } from 'ng-zorro-antd/message';

import { AddProductPageRoutingModule } from './add-product-page-routing.module';
import { AddProductPageComponent } from './add-product-page.component';
import { AddProductComponent } from '../../components/add-product/add-product.component';

@NgModule({
  declarations: [AddProductPageComponent, AddProductComponent],
  imports: [
    CommonModule,
    AddProductPageRoutingModule,
    NzFormModule,
    ReactiveFormsModule,
    NzInputModule,
    NzSelectModule,
    CommonModule,
    NzInputNumberModule,
    NzSpinModule,
    NzButtonModule,
    NzIconModule,
    NzDividerModule,
    NzCardModule,
    NzMessageModule
  ],
  exports: [AddProductPageComponent, NzIconModule],
})
export class AddProductPageModule {}
