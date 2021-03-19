import { NzUploadFile } from 'ng-zorro-antd/upload';

export class ImageUpload {
  key: string;
  uid: string;
  name: string;
  url: string;
  file: File;
  constructor(file: File) {
    this.file = file;
  }
}
