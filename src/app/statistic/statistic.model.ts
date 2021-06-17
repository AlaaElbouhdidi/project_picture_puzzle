export class Statistic {
  puzzlesPlayed: number;
  correctAnswers: number;
  incorrectAnswers: number;
  winRatio: number;

  constructor(puzzlesPlayed: number, correctAnswers: number, incorrectAnswers: number) {
    this.puzzlesPlayed = puzzlesPlayed;
    this.correctAnswers = correctAnswers;
    this.incorrectAnswers = incorrectAnswers;
    this.winRatio = this.calcWinRatio();
  }

  calcWinRatio(): number {
    return Number(((this.correctAnswers / this.puzzlesPlayed) * 100).toFixed(2));
  }

}
