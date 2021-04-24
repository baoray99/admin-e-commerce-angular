import { Component, OnInit } from '@angular/core';
import { Category } from '../../models/category.models';
import { CategoryService } from '../../services/category.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../models/user.models';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  isCollapsed = false;
  categories: Category[];
  isVisible = false;
  isOkLoading = false;
  user: User;
  constructor(
    private categoryService: CategoryService,
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}
  ngOnInit() {
    this.getCategories();
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
    this.authService
      .getMe(/*JSON.parse(window.localStorage.getItem('token'))*/)
      .subscribe((res) => (this.user = res));
  }
  getCategories() {
    this.categoryService
      .getCategories()
      .subscribe((data) => (this.categories = data));
  }
  validateForm!: FormGroup;

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    this.authService
      .login(this.validateForm.value.userName, this.validateForm.value.password)
      .subscribe((res) => {
        window.localStorage.setItem('token', JSON.stringify(res.accessToken));
        this.router.navigate(['']);
      });
  }
  logOut() {
    window.localStorage.clear();
    this.router.navigate(['/login']);
  }
}
