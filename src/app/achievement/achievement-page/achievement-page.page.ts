import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-achievement-page',
  templateUrl: './achievement-page.page.html',
  styleUrls: ['./achievement-page.page.scss'],
})
export class AchievementPagePage implements OnInit {

  public playAchievement: boolean = false;

  constructor(private toastCtrl: ToastController) { }

  ngOnInit() {
  }
  
  displayAchievement(){
  this.toastCtrl.create({
    message: 'Achievement unlocked!',
    duration: 1000
  }).then((toast) => {
    toast.present();
  });

  this.playAchievement = true;

  setTimeout(() => {
    this.playAchievement = false;
  }, 2000);

  }
}
