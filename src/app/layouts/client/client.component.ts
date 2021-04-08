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
} from '@fortawesome/free-solid-svg-icons';
import { CartService } from 'src/app/services/cart.service';
import {
  ActivatedRoute,
  NavigationEnd,
  NavigationStart,
  Router,
} from '@angular/router';
import { Product } from 'src/app/models/product.models';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
})
export class ClientComponent implements OnInit {
  constructor(
    private categoryService: CategoryService,
    private cartService: CartService,
    private router: Router
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
  cart$: Observable<any[]>;
  totalCost$: Observable<number>;
  ngOnInit(): void {
    this.categoryService
      .getCategories()
      .subscribe((res) => (this.categories = res));
    this.cartService.fetchData();
    this.cart$ = this.cartService.cart$;
    this.totalCost$ = this.cartService.totalCost$;
  }
}
