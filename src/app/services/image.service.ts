import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';

import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { ImageUpload } from '../models/imageUpload.models';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  private basePath = '/product_images';
  constructor(
    private db: AngularFireDatabase,
    private storage: AngularFireStorage
  ) {}

  pushFileToStorage(
    imageUpload: ImageUpload,
    uploaded: any,
    self: any,
    //callback khi xong task se chay
  ): Observable<number> {
    const filePath = `${this.basePath}/${imageUpload.file.name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, imageUpload.file);

    uploadTask
      .snapshotChanges()
      .pipe(
        finalize(() => {
          storageRef.getDownloadURL().subscribe((downloadURL) => {
            imageUpload.url = downloadURL;
            imageUpload.name = imageUpload.file.name;
            this.saveFileData(imageUpload);
            this.callback(downloadURL, uploaded, self); 
          });
        })
      )
      //show % tien do, progress bar
      .subscribe();
    return uploadTask.percentageChanges();
  }

  callback(data, uploaded: any, self: any) {
    uploaded && uploaded instanceof Function && uploaded(data, self);
    // truyen self để lấy thuộc tinh trong class đích
  }

  private saveFileData(imageUpload: ImageUpload): void {
    this.db.list(this.basePath).push(imageUpload);
  }

  getFiles(numberItems): AngularFireList<ImageUpload> {
    return this.db.list(this.basePath, (ref) => ref.limitToLast(numberItems));
  }

  deleteFile(ImageUpload: ImageUpload): void {
    this.deleteFileDatabase(ImageUpload.key)
      .then(() => {
        this.deleteFileStorage(ImageUpload.name);
      })
      .catch((error) => console.log(error));
  }

  private deleteFileDatabase(key: string): Promise<void> {
    return this.db.list(this.basePath).remove(key);
  }

  private deleteFileStorage(name: string): void {
    const storageRef = this.storage.ref(this.basePath);
    storageRef.child(name).delete();
  }
}
