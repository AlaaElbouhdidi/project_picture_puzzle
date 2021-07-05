export class UserData {
  modulesCompleted: number;
  puzzlesPlayed: number;
  sixSeries: number;
  correctAnswers: number;
  incorrectAnswers: number;
  language: string;

  constructor(modulesCompleted?: number, puzzlesPlayed?: number,
              sixSeries?: number, language?: string,
              correctAnswers?: number, incorrectAnswers?: number) {
    this.modulesCompleted = modulesCompleted;
    this.puzzlesPlayed = puzzlesPlayed;
    this.sixSeries = sixSeries;
    this.language = language;
    this.correctAnswers = correctAnswers;
    this.incorrectAnswers = incorrectAnswers;
  }
}
