import { Component } from '@angular/core';
import {ModuleService} from '../module/module.service';
import { AngularFireStorage } from '@angular/fire/storage';
import {UserService} from '../user/user.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public logoURL;

  constructor(private moduleService: ModuleService, private afSG: AngularFireStorage,
              private userService: UserService) {
    console.log(this.moduleService.modules);
    this.getLogoURL();
  }
  getLogoURL() {
    this.afSG.ref('/Images/Logo.png').getDownloadURL().subscribe(imgUrl => {
      console.log(imgUrl);
      this.logoURL = imgUrl;
    });
  }
  logout(){
    this.userService.logout();
}
}
