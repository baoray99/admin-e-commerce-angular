import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Brand } from 'src/app/models/brand.models';
import { BrandService } from 'src/app/services/brand.service';

import { ImageService } from 'src/app/services/image.service';
import { ImageUpload } from 'src/app/models/imageUpload.models';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/models/category.models';

import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent implements OnInit {
  validateForm!: FormGroup;
  loading = false;
  selectedFiles: FileList;
  currentFileUpload: ImageUpload;
  percentage: number;
  brands: Brand[];
  categories: Category[];
  addSuccess() {
    this.message.success('Add product successfully!');
  }
  constructor(
    private productService: ProductService,
    private brandService: BrandService,
    private categoryService: CategoryService,
    private fb: FormBuilder,
    private imageServices: ImageService,
    private message: NzMessageService
  ) {}
  ngOnInit() {
    this.brandService.getBrands().subscribe((data) => (this.brands = data));
    this.categoryService
      .getCategories()
      .subscribe((data) => (this.categories = data));
    this.validateForm = this.fb.group({
      name: [null, [Validators.required]],
      category: [null, Validators.required],
      brand: [null, [Validators.required]],
      price: [null, Validators.required],
      sales_price: [null],
      quantity: [null, Validators.required],
      description: [null],
      product_detail: this.fb.array([]),
      image: this.fb.array([]),
    });
  }
  get product_detail(): FormArray {
    return this.validateForm.get('product_detail') as FormArray;
  }
  get image(): FormArray {
    return this.validateForm.get('image') as FormArray;
  }
  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    this.product_detail.controls.forEach((control) => {
      control.get('prop').markAsDirty();
      control.get('prop').updateValueAndValidity();
      control.get('val').markAsDirty();
      control.get('val').updateValueAndValidity();
    });
    if (this.validateForm.valid) {
      this.loading = true;
      const product_detail = {};
      const image = [];
      this.validateForm.value.product_detail.forEach((detail) => {
        product_detail[detail.prop] = detail.val;
      });
      this.validateForm.value.image.forEach((img) => {
        image.push(img.url);
      });
      const product = {
        name: this.validateForm.value.name,
        id_category: this.validateForm.value.category,
        category: this.categories.find(
          (data) => (data._id = this.validateForm.value.category)
        ),
        id_brand: this.validateForm.value.brand,
        brand: this.brands.find(
          (data) => (data._id = this.validateForm.value.brand)
        ),
        price: this.validateForm.value.price,
        sales_price: this.validateForm.value.sales_price,
        quantity: this.validateForm.value.quantity,
        description: this.validateForm.value.description,
        product_detail: product_detail,
        image: image,
      };
      this.productService.addProduct(product).subscribe(
        (res) => {
          this.loading = false;
          this.addSuccess();
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
  addField(e?: MouseEvent): void {
    if (e) {
      e.preventDefault();
    }
    this.product_detail.push(
      this.fb.group({
        prop: [null, [Validators.required]],
        val: [null, [Validators.required]],
      })
    );
  }
  removeField(i: number, e: MouseEvent): void {
    e.preventDefault();
    if (this.product_detail.length > 0) {
      this.product_detail.removeAt(i);
    }
  }
  upload(event): void {
    this.selectedFiles = event.target.files;
    const file = this.selectedFiles.item(0);
    this.selectedFiles = undefined;
    this.currentFileUpload = new ImageUpload(file);
    this.imageServices
      .pushFileToStorage(this.currentFileUpload, this.callback, this)
      .subscribe(
        (percentage) => {
          this.percentage = Math.round(percentage);
        },
        (error) => {
          console.log(error);
        }
      );
  }
  callback(data, self) {
    self.image.push(
      self.fb.group({
        url: [data],
      })
    );
  }
  //khi lưu data sẽ gọi call back để set url
  deleteImg(i: number, e: MouseEvent) {
    e.preventDefault();
    if (this.image.length > 0) {
      this.image.removeAt(i);
    }
  }
}
