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
  MenuOutline,
  MailOutline,
  ThunderboltOutline,
  ReadOutline,
  CaretDownFill,
  StarFill,
  SecurityScanFill,
  ShoppingFill,
  PhoneOutline,
  SolutionOutline,
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
  MenuOutline,
  MailOutline,
  ThunderboltOutline,
  ReadOutline,
  CaretDownFill,
  StarFill,
  SecurityScanFill,
  ShoppingFill,
  PhoneOutline,
  SolutionOutline,
];

@NgModule({
  imports: [NzIconModule],
  exports: [NzIconModule],
  providers: [{ provide: NZ_ICONS, useValue: icons }],
})
export class IconsProviderModule {}
