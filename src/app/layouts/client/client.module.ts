import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { ClientComponent } from './client.component';

import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { IconsProviderModule } from '../../icons-provider.module';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';

import { CarouselModule } from 'ngx-owl-carousel-o';

@NgModule({
  declarations: [ClientComponent],
  imports: [
    CommonModule,
    ClientRoutingModule,
    NzLayoutModule,
    IconsProviderModule,
    NzCarouselModule,
    CarouselModule
  ],
  exports: [CarouselModule],
})
export class ClientModule {}
