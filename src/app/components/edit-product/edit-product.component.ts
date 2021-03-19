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
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss'],
})
export class EditProductComponent implements OnInit {
  validateForm!: FormGroup;
  lodash = _;
  loading = false;
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
  submitForm(): void {
    this.loading=true;
    this.product_detail.controls.forEach((control) => {
      control.get('prop').markAsDirty();
      control.get('prop').updateValueAndValidity();
      control.get('val').markAsDirty();
      control.get('val').updateValueAndValidity();
    });
    const product_detail = {};
    const image = [];
    this.validateForm.value.product_detail.forEach((detail) => {
      product_detail[detail.prop] = detail.val;
    });
    this.validateForm.value.image.forEach((img) => {
      image.push(img.url);
    });
    const editedProduct = {
      name: this.validateForm.value.name,
      brand: this.validateForm.value.brand,
      price: this.validateForm.value.price,
      sales_price: this.validateForm.value.sales_price,
      quantity: this.validateForm.value.quantity,
      description: this.validateForm.value.description,
      product_detail: product_detail,
      image: image,
    };
    this.productService.updateProduct(this.data._id, editedProduct).subscribe(
      (res) => {
        this.loading=false
        console.log('success');
      },
      (error) => {
        console.log(error);
      }
    );
  }
  constructor(
    private productService: ProductService,
    private brandService: BrandService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private imageServices: ImageService
  ) {}
  data: Product;
  brands: Brand[];

  ngOnInit(): void {
    this.brandService.getBrands().subscribe((data) => (this.brands = data));
    this.productService
      .getProductById(this.route.snapshot.queryParamMap.get('id'))
      .subscribe(
        (data) => (
          (this.data = data),
          Object.keys(data.product_detail).forEach((key) =>
            this.product_detail.push(
              this.fb.group({
                prop: [key, [Validators.required]],
                val: [
                  this.lodash.get(data.product_detail, key),
                  [Validators.required],
                ],
              })
            )
          ),
          data.image.forEach((img) => {
            this.image.push(
              this.fb.group({
                url: [img],
              })
            );
          })
        )
      );
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
  selectedFiles: FileList;
  currentFileUpload: ImageUpload;
  percentage: number;
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
