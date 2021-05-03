import { Component, OnInit, ElementRef, HostListener } from '@angular/core';
import { Category } from 'src/app/models/category.models';
import { CategoryService } from 'src/app/services/category.service';

import { Observable } from 'rxjs';

import { faTelegramPlane } from '@fortawesome/free-brands-svg-icons';
import {
  faMapMarkedAlt,
  faMobileAlt,
  faPhoneAlt,
  faEnvelope,
  faNewspaper,
  faPhoneVolume,
  faMoneyBillAlt,
  faTags,
  faUserCircle,
} from '@fortawesome/free-solid-svg-icons';
import { CartService } from 'src/app/services/cart.service';
import { NavigationEnd, Router } from '@angular/router';
import { Product } from 'src/app/models/product.models';
import 'lodash';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user.models';
declare var _: any;

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
})
export class ClientComponent implements OnInit {
  constructor(
    private categoryService: CategoryService,
    private cartService: CartService,
    private router: Router,
    private authService: AuthService
  ) {
    this.router.events.subscribe((res) => {
      var cateContent = document.querySelector('.cate-content');
      if (res instanceof NavigationEnd && res.url == '/client/homepage') {
        cateContent.setAttribute('style', 'display: block;');
      } else cateContent.removeAttribute('style');
    });
  }
  isSticky = false;
  @HostListener('window:scroll')
  checkScroll() {
    var navbar = document.querySelector('.navbar-scroll');
    if (window.pageYOffset >= 450) {
      navbar.setAttribute('style', 'display: flex;');
      this.isSticky = true;
    } else {
      this.isSticky = false;
      navbar.setAttribute('style', 'display: none;');
    }
  }
  search = 'all';
  categories: Category[];
  faTelegramPlane = faTelegramPlane;
  faMapMarkedAlt = faMapMarkedAlt;
  faMobileAlt = faMobileAlt;
  faPhoneAlt = faPhoneAlt;
  faEnvelope = faEnvelope;
  faNewspaper = faNewspaper;
  faPhoneVolume = faPhoneVolume;
  faMoneyBillAlt = faMoneyBillAlt;
  faTags = faTags;
  faUserCircle = faUserCircle;
  cart$: Observable<any[]>;
  totalCost$: Observable<number>;
  seenProduct: Observable<Product[]>;
  user$: Observable<User>;
  ngOnInit(): void {
    this.categoryService
      .getCategories()
      .subscribe((res) => (this.categories = res));
    this.authService.fetchUser();
    this.user$ = this.authService.user$;
    this.cartService.fetchData();
    this.cart$ = this.cartService.cart$;
    this.totalCost$ = this.cartService.totalCost$;
    this.seenProduct = this.cartService.seenProduct$;
  }
  logOut() {
    window.localStorage.removeItem('token');
    this.authService.fetchUser();
    this.user$ = this.authService.user$;
    this.router.navigate(['/client/homepage'])
  }
}
