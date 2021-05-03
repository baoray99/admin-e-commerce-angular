import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.scss'],
})
export class ItemDetailsComponent implements OnInit {
  @Input('data')
  set data(data: any) {
    this._data = data;
  }
  get data() {
    return this._data;
  }
  private _data: any;
  constructor() {}
  visible = false;
  ngOnInit(): void {}
  open(): void {
    this.visible = true;
  }
  close(): void {
    this.visible = false;
  }
}
