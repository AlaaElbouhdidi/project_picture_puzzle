import { Injectable } from '@angular/core';
import {ToastController} from '@ionic/angular';
import {AngularFirestore} from '@angular/fire/firestore';
import {UserService} from '../user/user.service';
import {Achievement} from './achievement.model';
import firebase from 'firebase';
import User = firebase.User;

@Injectable({
  providedIn: 'root'
})
export class AchievementService {

  constructor(
    private toastCtrl: ToastController,
    private afs: AngularFirestore,
    private userService: UserService
  ) { }

  /**
   * Display an achievement notification on the screen which disappears after a given time.
   */
  async displayAchievementNotification(): Promise<void> {
    const toast = await this.toastCtrl.create({
      cssClass: 'default-toast',
      message: 'Achievement unlocked!',
      duration: 2000
    });
    await toast.present();
  }

  /**
   * Check if enough puzzles were played to get a specific achievement.
   * 10 played - Amateur,
   * 25 played - Beginner,
   * 50 played - Professional,
   * 100 played - World Class,
   * 200 played - Legendary,
   * 500 played - Ultimate
   *
   * @param puzzlesPlayed The amount of puzzles played.
   */
  async checkAchievement(puzzlesPlayed: number) {
    const data = {
      received: true,
      date: new Date().toLocaleDateString()
    };
    switch (puzzlesPlayed) {
      case 10:
        await this.updateAchievement('MfOq2JLybuzEN9zCDNFV', data);
        await this.displayAchievementNotification();
        break;
      case 25:
        await this.updateAchievement('XTQdCTCX79YTqvfje05z', data);
        await this.displayAchievementNotification();
        break;
      case 50:
        await this.updateAchievement('Jzu5y82svpSQMNfLQdhl', data);
        await this.displayAchievementNotification();
        break;
      case 100:
        await this.updateAchievement('IPfTJxibdl5zRXsVXzc4', data);
        await this.displayAchievementNotification();
        break;
      case 200:
        await this.updateAchievement('KdyJ7A7CjLVKJM2ySnMZ', data);
        await this.displayAchievementNotification();
        break;
      case 500:
        await this.updateAchievement('4AD0Cq5UbLwgNjkFmcpL', data);
        await this.displayAchievementNotification();
        break;
    }
  }

  /**
   * Update an achievement of the logged in user.
   *
   * @param id The id of the achievement.
   * @param data The data to update the achievement with.
   */
  async updateAchievement(id: string, data: any): Promise<void> {
    await this.afs
      .collection<User>('users')
      .doc(this.userService.user.uid)
      .collection<Achievement>('achievements')
      .doc(id)
      .update(data);
  }

  /**
   * Load all achievements of the logged in user.
   */
  async loadUserAchievements(): Promise<Achievement[]> {
    const snapshot = await this.afs
      .collection<User>('users')
      .doc(this.userService.user.uid)
      .collection<Achievement>('achievements')
      .get()
      .toPromise();
    return snapshot.docs.map(doc => {
      const achievement = doc.data();
      achievement.id = doc.id;
      return achievement;
    });
  }

}
