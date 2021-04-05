import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomepageRoutingModule } from './homepage-routing.module';
import { HomepageComponent } from './homepage.component';

import { IconsProviderModule } from '../../icons-provider.module';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';

import { CarouselModule } from 'ngx-owl-carousel-o';

@NgModule({
  declarations: [HomepageComponent],
  imports: [
    CommonModule,
    HomepageRoutingModule,
    CarouselModule,
    NzCarouselModule,
    IconsProviderModule
  ],
  exports: [CarouselModule],
})
export class HomepageModule {}
