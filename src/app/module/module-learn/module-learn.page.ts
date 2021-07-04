import {Component, OnInit} from '@angular/core';
import {Puzzle} from '../puzzle.model';
import {Statistic} from '../../statistic/statistic.model';
import {ActivatedRoute, Router} from '@angular/router';
import {Answer} from '../answer.model';
import {ModuleService} from '../module.service';
import {AngularFireStorage} from '@angular/fire/storage';
import {AlertController} from '@ionic/angular';
import {UserService} from '../../user/user.service';
import {AchievementService} from '../../achievement/achievement.service';
import {UserData} from '../../user/user.model';

@Component({
  selector: 'app-module-learn',
  templateUrl: './module-learn.page.html',
  styleUrls: ['./module-learn.page.scss'],
})
export class ModuleLearnPage implements OnInit {

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
  userData: UserData;
  puzzlesPlayed: number;

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
    this.userData.puzzlesPlayed++;

    if (answer.correct) {
      this.result = true;
      this.statistic.correctAnswers++;
      currentPuzzle.correctlyAnsweredInRow++;

      this.userData.sixSeries++;
      if (currentPuzzle.correctlyAnsweredInRow >= 6) {
        await this.userService.updateUserData({ sixSeries: this.userData.sixSeries });
      }

      this.userData.correctAnswers++;
      await this.userService.updateUserData({
        puzzlesPlayed: this.userData.puzzlesPlayed,
        correctAnswers: this.userData.correctAnswers
      });
      await this.moduleService.updatePuzzleInModule(currentPuzzle, this.moduleId);

    } else {

      this.correctAnswer = currentPuzzle.answers.find(a => a.correct);
      this.result = false;
      this.statistic.incorrectAnswers++;
      currentPuzzle.correctlyAnsweredInRow = 0;

      this.userData.incorrectAnswers++;
      await this.userService.updateUserData({
        puzzlesPlayed: this.userData.puzzlesPlayed,
        incorrectAnswers: this.userData.incorrectAnswers
      });
      await this.moduleService.updatePuzzleInModule(currentPuzzle, this.moduleId);

    }
    this.statistic.puzzlesPlayed++;
    await this.achievementService.checkAchievement(this.statistic.puzzlesPlayed + this.puzzlesPlayed);
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
    await this.checkModuleCompleted();
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
      message: 'Are you sure you want to leave the learn mode?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            this.alertController.dismiss();
          }
        }, {
          text: 'Confirm',
          handler: async () => {
            if (!this.showStatistic) {
              await this.checkModuleCompleted();
            }
            await this.router.navigate(['/home']);
          }
        }
      ]
    });
    await alert.present();
  }

  async checkModuleCompleted(): Promise<void> {
    const moduleCompleted = this.puzzles.every(puzzle => puzzle.correctlyAnsweredInRow >= 6);
    this.userData.modulesCompleted++;
    if (moduleCompleted) {
      await this.userService.updateUserData({modulesCompleted: this.userData.modulesCompleted});
    }
  }

  async ngOnInit(): Promise<void> {
    this.userData = await this.userService.findById(this.userService.user.uid);
    this.puzzlesPlayed = this.userData.puzzlesPlayed;
  }

}
