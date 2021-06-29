import { Component, OnInit } from '@angular/core';
import {AlertController, ToastController} from '@ionic/angular';
import {Achievement} from '../achievement.model';

@Component({
  selector: 'app-achievement-page',
  templateUrl: './achievement-page.page.html',
  styleUrls: ['./achievement-page.page.scss'],
})
export class AchievementPagePage implements OnInit {

  public playAchievement: boolean = false;
  userAchievements: Achievement[];

  constructor(private toastCtrl: ToastController, private alertController: AlertController) {
    this.userAchievements = this.loadTestAchievements();
  }

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

  async showAchievementInfo(achievement: Achievement): Promise<void> {
      const alert = await this.alertController.create({
        cssClass: 'default-alert',
        header: achievement.text,
        subHeader: `Received at: ${achievement.date}`,
        message: achievement.description,
        buttons: ['OK']
      });
      await alert.present();
  }

  loadTestAchievements(): Achievement[] {
    return [
      new Achievement('1', 'Amateur', 'assets/awards/Amateur.png', 'This is a description placeholder', new Date().toLocaleDateString()),
      new Achievement('2', 'Beginner', 'assets/awards/Beginner.png', 'This is a description placeholder', new Date().toLocaleDateString()),
      new Achievement('3', 'Professional', 'assets/awards/Professional.png', 'This is a description placeholder', new Date().toLocaleDateString()),
      new Achievement('4', 'World Class', 'assets/awards/WorldClass.png', 'This is a description placeholder', new Date().toLocaleDateString()),
      new Achievement('5', 'Legendary', 'assets/awards/Legendary.png', 'This is a description placeholder', new Date().toLocaleDateString()),
      new Achievement('6', 'Ultimate', 'assets/awards/Ultimate.png', 'This is a description placeholder', new Date().toLocaleDateString())
    ]
  }

}
