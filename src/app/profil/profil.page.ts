import { Component } from '@angular/core';
import {AngularFireStorage} from '@angular/fire/storage';
import {UserService} from '../user/user.service';
import {Router} from '@angular/router';
import {ActionSheetController, ToastController, Platform} from '@ionic/angular';
import { File } from '@ionic-native/File/ngx';
import {Camera, CameraOptions, PictureSourceType} from '@ionic-native/camera/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.page.html',
  styleUrls: ['./profil.page.scss'],
})
export class ProfilPage  {
  public profilPic;
  defaultPic;
  name;
  constructor( private afSG: AngularFireStorage,
               public userService: UserService,
               private toastCtrl: ToastController,
               private actionSheetController: ActionSheetController,
               private camera: Camera, private file: File, private platform: Platform, private filePath: FilePath,
               private router: Router) {
  console.log(userService.userData);
    this.afSG.ref('/Images/ProfilPic/mannlicher-benutzer.png').getDownloadURL().subscribe(imgUrl => {
      this.defaultPic = imgUrl;
    });
    this.getProfilPicURL(userService.user.uid);
  }
  getProfilPicURL(uid: string) {
    this.afSG.ref('/Images/ProfilPic/'+uid+'').getDownloadURL().subscribe(imgUrl => {
      this.profilPic = imgUrl;
    }, error => {
      this.profilPic = this.defaultPic;
      console.log(error);
    });
  }
  /*uploadImage(event){
    const file = event.target.files;
    console.log(file);
    const fileName = file[0];

    if(fileName.type.split('/')[0] !== 'image'){
      console.error('File is not an Image');
      return;
    }
    const path = `Images/ProfilPic/${this.userService.user.uid}`;

    const fileRef = this.afSG.ref(path);
    fileRef.put(file[0]).then(() => {
      console.log('Uploaded ', file);
      this.router.navigate(['/profil']);
    });
}*/
  async presentToast(text) {
    const toast = await this.toastCtrl.create({
      message: text,
      position: 'bottom',
      duration: 3000
    });
    toast.present();
  }
  async selectImage() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Select Image source',
      buttons: [{
        text: 'Load from Library',
        handler: () => {
          this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
        }
      },
        {
          text: 'Use Camera',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    await actionSheet.present();
  }
  takePicture(sourceType: PictureSourceType) {
    const options: CameraOptions = {
      quality: 100,
      sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };

    this.camera.getPicture(options).then(imagePath => {
      if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
        this.filePath.resolveNativePath(imagePath)
          .then(filePath => {
            const correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
            const currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
            console.log(correctPath);
            console.log(currentName);
            this.copyFileToStorage(correctPath, currentName);
          });
      } else {
        const currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
        const correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
        console.log(correctPath);
        console.log(currentName);
        this.copyFileToStorage(correctPath, currentName);
      }
    });

  }
  copyFileToStorage(namePath, currentName) {

      const fileRef = this.afSG.ref(namePath);
      fileRef.put(currentName).then(() => {
        console.log('Uploaded ', namePath);
        this.presentToast('File upload complete.');
        this.router.navigate(['/profil']);
    }, error => {
      this.presentToast('Error while storing file.');
      console.log(error);
    });
  }
  logout(){
    this.userService.logout();
  }

}
