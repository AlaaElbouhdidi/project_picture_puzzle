export class Statistic {
  puzzlesPlayed: number;
  correctAnswers: number;
  incorrectAnswers: number;
  winRatio: number;
  sixSerienCompleted: number;
  modulesCompleted: number;

  constructor(puzzlesPlayed: number, correctAnswers: number, incorrectAnswers: number,
              sixSerienCompleted: number, modulesCompleted: number) {
    this.puzzlesPlayed = puzzlesPlayed;
    this.correctAnswers = correctAnswers;
    this.incorrectAnswers = incorrectAnswers;
    this.winRatio = this.calcWinRatio();
    this.sixSerienCompleted = sixSerienCompleted;
    this.modulesCompleted = modulesCompleted ;
  }

  calcWinRatio(): number {
    return Number(((this.correctAnswers / this.puzzlesPlayed) * 100).toFixed(2));
  }

  lossRatio(): number{
    return Number(((this.incorrectAnswers / this.puzzlesPlayed) * 100).toFixed(2));
  }

}
