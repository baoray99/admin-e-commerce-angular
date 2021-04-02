import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { ClientComponent } from './client.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { IconsProviderModule } from '../../icons-provider.module';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzSelectModule } from 'ng-zorro-antd/select';

import { CarouselModule } from 'ngx-owl-carousel-o';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [ClientComponent],
  imports: [
    CommonModule,
    ClientRoutingModule,
    NzLayoutModule,
    IconsProviderModule,
    NzCarouselModule,
    CarouselModule,
    FontAwesomeModule,
    NzInputModule,
    NzDropDownModule,
    NzSelectModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [CarouselModule],
})
export class ClientModule {}
