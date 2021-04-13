import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsByCategoryRoutingModule } from './products-by-category-routing.module';
import { ProductsByCategoryComponent } from './products-by-category.component';

import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { IconsProviderModule } from '../../icons-provider.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [ProductsByCategoryComponent],
  imports: [
    CommonModule,
    ProductsByCategoryRoutingModule,
    NzPaginationModule,
    CarouselModule,
    IconsProviderModule,
    NzSelectModule,
    FormsModule
  ]
})
export class ProductsByCategoryModule { }
