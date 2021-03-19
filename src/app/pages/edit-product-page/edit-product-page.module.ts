import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzCardModule } from 'ng-zorro-antd/card';

import { EditProductPageRoutingModule } from './edit-product-page-routing.module';
import { EditProductPageComponent } from './edit-product-page.component';
import { EditProductComponent } from '../../components/edit-product/edit-product.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [EditProductPageComponent, EditProductComponent],
  imports: [
    EditProductPageRoutingModule,
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
  ],
  exports: [EditProductPageComponent, NzIconModule],
})
export class EditProductPageModule {}
