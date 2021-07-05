import { Component } from '@angular/core';
import {AngularFireStorage} from '@angular/fire/storage';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public logoURL;

  constructor(private afSG: AngularFireStorage, private router: Router) {
    this.getLogoURL();
  }

  getLogoURL() {
    this.afSG.ref('/Images/Logo.png').getDownloadURL().subscribe(imgUrl => {
      this.logoURL = imgUrl;
    });
  }

  showProfile() {
    this.router.navigate(['/profil']);
  }

  showModuleList() {
    this.router.navigate(['/module-list']);
  }

  showHelpPage() {
    this.router.navigate(['/help']);
  }

  showAchievements() {
    this.router.navigate(['/achievement-page']);
  }

  showStatistics() {
    this.router.navigate(['/statistic-page']);
  }

}
