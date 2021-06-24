export class UserData {
  modulesCompleted: number;
  puzzlesPlayed: number;
  winRatio: number;
  lossRatio: number;
  sixSeries: number;
  correctAnswers: number;
  incorrectAnswers: number;
  language: string;
  name: string;
  tel: string;

  constructor(modulesCompleted?: number, puzzlesPlayed?: number,
              winRatio?: number, lossRatio?: number, sixSeries?: number, language?: string,
              correctAnswers?: number, incorrectAnswers?: number, name?: string, tel?: string) {
    this.modulesCompleted = modulesCompleted;
    this.puzzlesPlayed = puzzlesPlayed;
    this.winRatio = winRatio;
    this.lossRatio = lossRatio;
    this.sixSeries = sixSeries;
    this.language = language;
    this.correctAnswers = correctAnswers;
    this.incorrectAnswers = incorrectAnswers;
    this.name = name;
    this.tel = tel;
  }
}
