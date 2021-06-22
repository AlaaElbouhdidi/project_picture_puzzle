export class UserData {
  modulesCompleted: number;
  puzzlesPlayed: number;
  winRatio: number;
  lossRatio: number;
  sixSeries: number;

  name: string;
  tel: string;

  constructor(modulesCompleted?: number, puzzlesPlayed?: number,
              winRatio?: number, lossRatio?: number, sixSeries?: number,
              name?: string, tel?: string) {
    this.modulesCompleted = modulesCompleted;
    this.puzzlesPlayed = puzzlesPlayed;
    this.winRatio = winRatio;
    this.lossRatio = lossRatio;
    this.sixSeries = sixSeries;
    this.name = name;
    this.tel = tel;
  }
}
