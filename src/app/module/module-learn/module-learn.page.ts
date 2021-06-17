import { Component } from '@angular/core';
import {Puzzle} from '../puzzle.model';
import {Statistic} from '../../statistic/statistic.model';
import {ActivatedRoute, Router} from '@angular/router';
import {Answer} from '../answer.model';
import {ModuleService} from '../module.service';
import {AngularFireStorage} from '@angular/fire/storage';

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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private moduleService: ModuleService,
    private afSG: AngularFireStorage
  ) {
    const puzzleId = this.route.snapshot.paramMap.get('puzzleId');
    this.moduleId = this.route.snapshot.paramMap.get('moduleId');
    this.puzzles = this.moduleService.activePuzzles;
    this.currentPuzzleIndex = this.findPuzzleIndex(puzzleId);
    this.statistic = new Statistic(0, 0, 0);
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

  checkAnswer(answer: Answer): void {
    if (this.answerSelected) { return }
    const currentPuzzle = this.puzzles[this.currentPuzzleIndex];
    this.answerSelected = true;
    this.chosenAnswer = answer;
    if (answer.correct) {
      this.result = true;
      currentPuzzle.correctlyAnsweredInRow++;
      this.statistic.correctAnswers++;
      //this.moduleService.updatePuzzleInModule(currentPuzzle, this.moduleId);
    } else {
      this.correctAnswer = currentPuzzle.answers.find(a => a.correct);
      this.result = false;
      currentPuzzle.correctlyAnsweredInRow = 0;
      this.statistic.incorrectAnswers++;
      //this.moduleService.updatePuzzleInModule(currentPuzzle, this.moduleId);
    }
    this.statistic.puzzlesPlayed++;
    this.showNextPuzzleIcon = true;
  }

  checkPosition(index: number): string {
    switch (index) {
      case 0:
        return 'A'
      case 1:
        return 'B'
      case 2:
        return 'C'
      case 3:
        return 'D'
    }
  }

  nextPuzzle(): void {
    this.reset();
    if (!(this.currentPuzzleIndex + 1 === this.puzzles.length)) {
      this.currentPuzzleIndex++;
      this.getImage();
      return;
    }
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

  leaveLearnMode(): void {
    this.router.navigate(['/home']);
  }

}
