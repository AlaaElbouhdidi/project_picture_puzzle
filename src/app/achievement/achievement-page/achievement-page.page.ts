import { Component, OnInit } from '@angular/core';
import {AlertController, ToastController} from '@ionic/angular';
import {Achievement} from '../achievement.model';
import {AchievementService} from '../achievement.service';

@Component({
  selector: 'app-achievement-page',
  templateUrl: './achievement-page.page.html',
  styleUrls: ['./achievement-page.page.scss'],
})
export class AchievementPagePage implements OnInit {

  userAchievements: Achievement[] = [];

  constructor(
    private toastCtrl: ToastController,
    private alertController: AlertController,
    private achievementService: AchievementService
  ) { }

  ngOnInit() {
    this.achievementService.loadUserAchievements()
      .then(data => {
        this.userAchievements = data;
        this.userAchievements = this.sortAchievements();
      })
      .catch(() => this.userAchievements = []);
  }

  /**
   * Sort the achievements from easiest to hardest to obtain.
   */
  sortAchievements(): Achievement[] {
    const achievements: Achievement[] = [];
    this.userAchievements.forEach(achievement => {
      switch(achievement.text) {
        case 'Amateur':
          achievements[0] = achievement;
          break;
        case 'Beginner':
          achievements[1] = achievement;
          break;
        case 'Professional':
          achievements[2] = achievement;
          break;
        case 'World Class':
          achievements[3] = achievement;
          break;
        case 'Legendary':
          achievements[4] = achievement;
          break;
        case 'Ultimate':
          achievements[5] = achievement;
          break;
      }
    });
    return achievements;
  }

  /**
   * Show info about a specific achievement (when it was received, whats the requirement to obtain it).
   *
   * @param achievement The achievement to show the info of.
   */
  async showAchievementInfo(achievement: Achievement): Promise<void> {
      const alert = await this.alertController.create({
        cssClass: 'default-alert',
        header: achievement.text,
        subHeader: achievement.date ? `Received at: ${achievement.date}` : 'Not received yet',
        message: achievement.description,
        buttons: ['OK']
      });
      await alert.present();
  }

}
