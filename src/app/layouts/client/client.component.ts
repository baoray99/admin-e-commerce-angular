import { Component, OnInit, ElementRef, HostListener } from '@angular/core';
import { Category } from 'src/app/models/category.models';
import { CategoryService } from 'src/app/services/category.service';
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';
import { OwlOptions } from 'ngx-owl-carousel-o';

import { faTelegramPlane } from '@fortawesome/free-brands-svg-icons';
import {
  faMapMarkedAlt,
  faMobileAlt,
  faPhoneAlt,
  faEnvelope,
  faNewspaper,
} from '@fortawesome/free-solid-svg-icons';

export interface PhotosApi {
  albumId?: number;
  id?: number;
  title?: string;
  url?: string;
  thumbnailUrl?: string;
}
@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
})
export class ClientComponent implements OnInit {
  constructor(
    private categoryService: CategoryService,
    private readonly http: HttpClient,
    private el: ElementRef
  ) {}
  isSticky = false;
  @HostListener('window:scroll')
  checkScroll() {
    // var cateContent = document.querySelector('.cate-content');
    var logo = document.querySelector('.logo');
    var navbar = document.querySelector('.navbar-scroll');
    var cate = document.querySelector('.categories');
    if (window.pageYOffset >= 450) {
      // cateContent.setAttribute('style', 'display:block');
      navbar.setAttribute('style', 'display: flex;');
      // logo.setAttribute('class', 'categories');
      this.isSticky = true;
    } else {
      // navbar.setAttribute('style', 'position: relative');
      this.isSticky = false;
      navbar.setAttribute('style', 'display: none;');
    }
  }
  search = 'all';
  apiData: PhotosApi;
  limit: number = 10; // <==== Edit this number to limit API results
  customOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    center: true,
    dots: false,
    autoHeight: true,
    autoWidth: true,
    nav: true,
    navText: ['<', '>'],
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 2,
      },
      1000: {
        items: 5,
      },
    },
  };
  array = [1, 2, 3, 4];
  effect = 'scrollx';
  categories: Category[];
  faTelegramPlane = faTelegramPlane;
  faMapMarkedAlt = faMapMarkedAlt;
  faMobileAlt = faMobileAlt;
  faPhoneAlt = faPhoneAlt;
  faEnvelope = faEnvelope;
  faNewspaper = faNewspaper;
  ngOnInit(): void {
    this.categoryService
      .getCategories()
      .subscribe((res) => (this.categories = res));
    this.fetch();
  }
  fetch() {
    const api = `https://jsonplaceholder.typicode.com/albums/1/photos?_start=0&_limit=${this.limit}`;
    const http$ = this.http.get<PhotosApi>(api);

    http$.subscribe(
      (res) => (this.apiData = res),
      (err) => throwError(err)
    );
  }
}
