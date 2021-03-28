import { NgModule } from '@angular/core';
import { NZ_ICONS, NzIconModule } from 'ng-zorro-antd/icon';

import {
  MenuFoldOutline,
  MenuUnfoldOutline,
  FormOutline,
  DashboardOutline,
  LaptopOutline,
  DeleteOutline,
  PlusOutline,
  DownloadOutline,
  UserOutline,
  LockOutline,
  LogoutOutline,
  CaretDownOutline,
  ShoppingCartOutline,
  MenuOutline
} from '@ant-design/icons-angular/icons';

const icons = [
  MenuFoldOutline,
  MenuUnfoldOutline,
  DashboardOutline,
  FormOutline,
  LaptopOutline,
  DeleteOutline,
  PlusOutline,
  DownloadOutline,
  UserOutline,
  LockOutline,
  LogoutOutline,
  CaretDownOutline,
  ShoppingCartOutline,
  MenuOutline
];

@NgModule({
  imports: [NzIconModule],
  exports: [NzIconModule],
  providers: [{ provide: NZ_ICONS, useValue: icons }],
})
export class IconsProviderModule {}
