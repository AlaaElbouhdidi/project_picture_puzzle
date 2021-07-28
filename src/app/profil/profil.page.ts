import { Component } from '@angular/core';
import {AngularFireStorage} from '@angular/fire/storage';
import {UserService} from '../user/user.service';
import {Router} from '@angular/router';
import {ActionSheetController, ToastController, Platform} from '@ionic/angular';
import { File } from '@ionic-native/file/ngx';
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

  constructor( private afSG: AngularFireStorage,
               public userService: UserService,
               private toastCtrl: ToastController,
               private actionSheetController: ActionSheetController,
               private camera: Camera,
               private file: File,
               private platform: Platform,
               private filePath: FilePath,
               private router: Router
  ) {
    this.defaultPic = 'assets/userpic.png';
    this.getProfilPicURL(userService.user.uid);
  }

  getProfilPicURL(uid: string): void {
    this.afSG.ref('/Images/ProfilPic/'+uid+'').getDownloadURL().subscribe(imgUrl => {
      this.profilPic = imgUrl;
    }, () => {
      this.profilPic = this.defaultPic;
    });
  }

  async presentToast(text: string): Promise<void> {
    const toast = await this.toastCtrl.create({
      message: text,
      position: 'bottom',
      duration: 3000
    });
    await toast.present();
  }

  async selectImage(): Promise<void> {
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

  takePicture(sourceType: PictureSourceType): void {
    const options: CameraOptions = {
      quality: 100,
      sourceType,
      destinationType: this.camera.DestinationType.DATA_URL,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };

    this.camera.getPicture(options)
      .then(imagePath => {
        this.copyFileToStorage(imagePath);
      })
      .catch(() => {
        this.presentToast('Feature not supported yet');
      });

  }

  async copyFileToStorage(namePath): Promise<void> {
      const path = `Images/ProfilPic/${this.userService.user.uid}`;
      const fileRef = this.afSG.ref(path);
      fileRef.putString(namePath, 'base64', {contentType:'image/jpeg'}).then(() =>{
        this.presentToast('File upload complete.');
        this.router.navigate(['/home']);
    }, () => {
      this.presentToast('Error while storing file.');
    });
  }

  logout(): void {
    this.userService.logout();
  }

  openAchievement(): void {
    this.router.navigate(['/achievement-page']);
  }

  openStatistic(): void {
    this.router.navigate(['/statistic-page']);
  }

}
