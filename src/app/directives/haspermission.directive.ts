import {
  Directive,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { User } from '../models/user.models';
import { AuthService } from '../services/auth.service';

@Directive({
  selector: '[appHaspermission]',
})
export class HaspermissionDirective implements OnInit {
  private permission: string;
  private user: User;
  private isHidden = true;
  constructor(
    private authService: AuthService,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {}
  @Input()
  set appHaspermission(val) {
    this.permission = val;
    this.updateView();
  }
  @Input()
  set appHaspermissionUser(user) {
    this.user = user;
    this.updateView();
  }
  ngOnInit() {}
  private updateView() {
    if (this.checkPermission()) {
      if (this.isHidden) {
        this.viewContainer.createEmbeddedView(this.templateRef);
        this.isHidden = false;
      }
    } else {
      this.isHidden = true;
      this.viewContainer.clear();
    }
  }
  private checkPermission() {
    let hasPermission = false;
    if (this.user && this.user.role) {
      if (this.permission.toUpperCase() == this.user.role.toUpperCase()) {
        hasPermission = true;
      }
    }
    return hasPermission;
  }
}
