export class Statistic {
  puzzlesPlayed: number;
  correctAnswers: number;
  incorrectAnswers: number;
  sixSeriesCompleted: number;
  modulesCompleted: number;

  constructor(puzzlesPlayed: number, correctAnswers: number, incorrectAnswers: number,
              sixSeriesCompleted: number, modulesCompleted: number) {
    this.puzzlesPlayed = puzzlesPlayed;
    this.correctAnswers = correctAnswers;
    this.incorrectAnswers = incorrectAnswers;
    this.sixSeriesCompleted = sixSeriesCompleted;
    this.modulesCompleted = modulesCompleted ;
  }

  winRatio(): number {
    return Number(((this.correctAnswers / this.puzzlesPlayed) * 100).toFixed(2));
  }

  lossRatio(): number{
    return Number(((this.incorrectAnswers / this.puzzlesPlayed) * 100).toFixed(2));
  }

}
