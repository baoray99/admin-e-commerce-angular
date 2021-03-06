import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HaspermissionDirective } from '../../directives/haspermission.directive';

import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IconsProviderModule } from '../../icons-provider.module';
import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';

// import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpConfigInterceptor } from '../../interceptors/http-config.interceptor';

@NgModule({
  declarations: [MainComponent, HaspermissionDirective],
  imports: [
    CommonModule,
    MainRoutingModule,
    IconsProviderModule,
    NzLayoutModule,
    NzMenuModule,
    FormsModule,
    ReactiveFormsModule,
    NzInputModule,
    NzFormModule,
    NzAvatarModule,
    NzDropDownModule,
  ],
  bootstrap: [MainComponent],
 
})
export class MainModule {}
