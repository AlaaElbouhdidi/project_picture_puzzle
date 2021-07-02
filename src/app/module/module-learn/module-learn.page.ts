import { Component } from '@angular/core';
import {Puzzle} from '../puzzle.model';
import {Statistic} from '../../statistic/statistic.model';
import {ActivatedRoute, Router} from '@angular/router';
import {Answer} from '../answer.model';
import {ModuleService} from '../module.service';
import {AngularFireStorage} from '@angular/fire/storage';
import {AlertController} from '@ionic/angular';
import {UserService} from '../../user/user.service';
import {AchievementService} from '../../achievement/achievement.service';

@Component({
  selector: 'app-module-learn',
  templateUrl: './module-learn.page.html',
  styleUrls: ['./module-learn.page.scss'],
})
export class ModuleLearnPage {

  moduleId: string;
  puzzles: Puzzle[];
  currentPuzzleIndex = 0;
  chosenAnswer = {} as Answer;
  correctAnswer = {} as Answer;
  showNextPuzzleIcon = false;
  answerSelected = false;
  result: boolean;
  imageURL: string;
  loadImageError = false;
  statistic: Statistic;
  showStatistic = false;
  answerLanguage: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private moduleService: ModuleService,
    private afSG: AngularFireStorage,
    private alertController: AlertController,
    private userService: UserService,
    private achievementService: AchievementService
  ) {
    const puzzleId = this.route.snapshot.paramMap.get('puzzleId');
    this.moduleId = this.route.snapshot.paramMap.get('moduleId');
    this.puzzles = this.moduleService.activePuzzles;
    this.currentPuzzleIndex = this.findPuzzleIndex(puzzleId);
    this.statistic = new Statistic(0, 0, 0, 0, 0);
    this.answerLanguage = this.userService.userData.language;
    this.getImage();
  }

  getImage(): void {
    this.afSG.ref(this.puzzles[this.currentPuzzleIndex].image)
      .getDownloadURL()
      .toPromise()
      .then(url => {
        this.loadImageError = false;
        this.imageURL = url;
      })
      .catch(() => {
        this.loadImageError = true;
        this.imageURL = '';
      });
  }

  async checkAnswer(answer: Answer): Promise<void> {
    if (this.answerSelected) { return; }
    const currentPuzzle = this.puzzles[this.currentPuzzleIndex];
    this.answerSelected = true;
    this.chosenAnswer = answer;
    if (answer.correct) {
      this.result = true;
      currentPuzzle.correctlyAnsweredInRow++;
      if (currentPuzzle.correctlyAnsweredInRow >= 6) {
        this.statistic.sixSerienCompleted++;
        await this.userService.updateUserData({ sixSeries: this.userService.userData.sixSeries++ });
      }
      this.statistic.correctAnswers++;
      this.moduleService.updatePuzzleInModule(currentPuzzle, this.moduleId);
    } else {
      this.correctAnswer = currentPuzzle.answers.find(a => a.correct);
      this.result = false;
      currentPuzzle.correctlyAnsweredInRow = 0;
      this.statistic.incorrectAnswers++;
      this.moduleService.updatePuzzleInModule(currentPuzzle, this.moduleId);
    }
    this.statistic.puzzlesPlayed++;
    await this.achievementService.checkAchievement(this.statistic.puzzlesPlayed + this.userService.userData.puzzlesPlayed);
    this.showNextPuzzleIcon = true;
  }

  checkPosition(index: number): string {
    switch (index) {
      case 0:
        return 'A';
      case 1:
        return 'B';
      case 2:
        return 'C';
      case 3:
        return 'D';
    }
  }

  async nextPuzzle(): Promise<void> {
    this.reset();
    if (!(this.currentPuzzleIndex + 1 === this.puzzles.length)) {
      this.currentPuzzleIndex++;
      this.getImage();
      return;
    }
    await this.updateStatistic();
    this.showStatistic = true;
  }

  findPuzzleIndex(id: string): number {
    for(let i = 0; i < this.puzzles.length; i++) {
      if (this.puzzles[i].id === id) {
        return i;
      }
    }
  }

  reset(): void {
    this.result = null;
    this.correctAnswer = {} as Answer;
    this.chosenAnswer = {} as Answer;
    this.answerSelected = false;
    this.showNextPuzzleIcon = false;
    this.loadImageError = false;
    this.imageURL = '';
  }

  async changeLanguage(): Promise<void> {
    const alert = await this.alertController.create({
      cssClass: 'default-alert',
      header: 'Change language',
      message: 'Set the language in which the answers are displayed:',
      inputs: [
        {
          name: 'german',
          type: 'radio',
          label: 'German',
          value: 'German',
          handler: () => {
            const data = this.userService.userData;
            this.answerLanguage = 'de';
            data.language = 'de';
            this.userService.updateUserData(data);
            this.alertController.dismiss();
          },
          checked: this.answerLanguage === 'de'
        },
        {
          name: 'English',
          type: 'radio',
          label: 'English',
          value: 'English',
          handler: () => {
            const data = this.userService.userData;
            this.answerLanguage = 'eng';
            data.language = 'eng';
            this.userService.updateUserData(data);
            this.alertController.dismiss();
          },
          checked: this.answerLanguage === 'eng'
        }
      ]
    });
    await alert.present();
  }

  async leaveLearnMode(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Leave learn mode',
      cssClass: 'default-alert',
      message: 'Are you sure you want to leave the learn mode. No statistics from this round will be saved to your account!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            this.alertController.dismiss();
          }
        }, {
          text: 'Confirm',
          handler: () => {
            this.router.navigate(['/home']);
          }
        }
      ]
    });
    await alert.present();
  }

  async updateStatistic(): Promise<void> {
    const userStatistic = new Statistic(
      this.userService.userData.puzzlesPlayed += this.statistic.puzzlesPlayed,
      this.userService.userData.correctAnswers += this.statistic.correctAnswers,
      this.userService.userData.incorrectAnswers += this.statistic.incorrectAnswers,
      this.userService.userData.sixSeries += this.statistic.sixSerienCompleted,
      this.userService.userData.modulesCompleted
    );

    const moduleCompleted = this.puzzles.every(puzzle => puzzle.correctlyAnsweredInRow >= 6);

    const data = {
      puzzlesPlayed: userStatistic.puzzlesPlayed,
      correctAnswers: userStatistic.correctAnswers,
      incorrectAnswers: userStatistic.incorrectAnswers,
      winRatio: userStatistic.calcWinRatio(),
      lossRatio: userStatistic.lossRatio(),
      sixSeries: userStatistic.sixSerienCompleted,
      modulesCompleted: moduleCompleted ? this.userService.userData.modulesCompleted++ : this.userService.userData.modulesCompleted
    }
    await this.userService.updateUserData(data);
  }

}
