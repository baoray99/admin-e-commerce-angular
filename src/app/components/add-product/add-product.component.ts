import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product.models';
import { ProductService } from 'src/app/services/product.service';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Brand } from 'src/app/models/brand.models';
import { BrandService } from 'src/app/services/brand.service';
import 'lodash';
import { ImageService } from 'src/app/services/image.service';
import { ImageUpload } from 'src/app/models/imageUpload.models';
declare var _: any;

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent implements OnInit {
  validateForm!: FormGroup;
  lodash = _;
  loading = false;
  selectedFiles: FileList;
  currentFileUpload: ImageUpload;
  percentage: number;
  brands: Brand[];
  constructor(
    private productService: ProductService,
    private brandService: BrandService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private imageServices: ImageService
  ) {}
  ngOnInit() {
    this.brandService.getBrands().subscribe((data) => (this.brands = data));
    this.validateForm = this.fb.group({
      name: [null, [Validators.required]],
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
  submitForm(): void {}

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
