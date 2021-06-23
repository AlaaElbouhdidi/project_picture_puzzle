import {Puzzle} from '../module/puzzle.model';
import {Module} from '../module/module.model';

export class Statistic {
  puzzlesPlayed: number;
  correctAnswers: number;
  incorrectAnswers: number;
  winRatio: number;
  sixSerienCompleted : number ;
  modulesCompleted : number ;

  puzzles: Puzzle[] = [];
  modules: Module[] = [];


  constructor(puzzlesPlayed: number, correctAnswers: number, incorrectAnswers: number,sixSerienCompleted : number, modulesCompleted : number) {
    this.puzzlesPlayed = puzzlesPlayed;
    this.correctAnswers = correctAnswers;
    this.incorrectAnswers = incorrectAnswers;
    this.winRatio = this.calcWinRatio();
    this.sixSerienCompleted=sixSerienCompleted;
    this.modulesCompleted=modulesCompleted ;
    this.sixSerienCompletedCheck;
    this.mCompleted;
  }

  calcWinRatio(): number {
    return Number(((this.correctAnswers / this.puzzlesPlayed) * 100).toFixed(2));
  }
  lossRatio():number{
  return Number(((this.incorrectAnswers / this.puzzlesPlayed) * 100).toFixed(2));
  }

sixSerienCompletedCheck(puzzles: Puzzle[]){
  this.sixSerienCompleted = 0 ;
  for(let puzzl of puzzles){
    if(puzzl.correctlyAnsweredInRow=6){
      this.sixSerienCompleted++;
    }
  }
  
}
mCompleted(modules: Module[]){
  this.modulesCompleted=0 ;
 for(let modul of modules){
   if(modul.completed){
  this.modulesCompleted++ ;
   }
 }

}
}
