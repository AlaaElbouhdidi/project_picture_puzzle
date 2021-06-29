import {Component, ViewChild} from '@angular/core';
import {Statistic} from '../statistic.model';
import {Chart, registerables} from 'chart.js';
import {UserService} from '../../user/user.service';

Chart.register(...registerables);

@Component({
  selector: 'app-statistic-page',
  templateUrl: './statistic-page.page.html',
  styleUrls: ['./statistic-page.page.scss'],
})
export class StatisticPagePage {

  @ViewChild('winRatioChart') winRatioChart;

  puzzlesPlayed: number;
  correctAnswers: number;
  incorrectAnswers: number;
  lossRatio: number;
  sixSerienCompleted: number;
  modulesCompleted: number;
  winRatio: number;

  constructor(private userService: UserService) {
    const userStatistic = new Statistic(
      userService.userData.puzzlesPlayed,
      userService.userData.correctAnswers,
      userService.userData.incorrectAnswers,
      userService.userData.sixSeries,
      userService.userData.modulesCompleted
    );
    this.puzzlesPlayed = userStatistic.puzzlesPlayed;
    this.correctAnswers = userStatistic.correctAnswers;
    this.incorrectAnswers = userStatistic.incorrectAnswers;
    this.lossRatio = userStatistic.lossRatio();
    this.winRatio = userStatistic.calcWinRatio();
    this.sixSerienCompleted = userStatistic.sixSerienCompleted;
    this.modulesCompleted = userStatistic.modulesCompleted;
  }

  createDoughnutChart(winRatio: number, lossRatio: number): void {
    if (isNaN(winRatio) || isNaN(lossRatio)) {
      winRatio = 100;
      lossRatio = 0;
    }
    new Chart(this.winRatioChart.nativeElement, {
      type: 'doughnut',
      data: {
        datasets: [{
          label: 'Win ratio chart',
          data: [winRatio, lossRatio],
          backgroundColor: [
            '#00e5ff',
            'rgba(128, 128, 128, 0.2)',
          ],
          hoverOffset: 4,
          borderWidth: 0,
        }],
      },
      plugins: [{
        id: 'doughnut-text-center',
        beforeDraw: function(chart) {
          let width = chart.width,
            height = chart.height,
            ctx = chart.ctx;

          ctx.restore();
          let fontSize = (height / 114).toFixed(2);
          ctx.font = fontSize + 'rem sans-serif';
          ctx.textBaseline = 'middle';

          let text = winRatio + '%',
            textX = Math.round((width - ctx.measureText(text).width) / 2),
            textY = height / 2;

          ctx.fillStyle = '#ffffff';
          ctx.fillText(text, textX, textY);
          ctx.save();
        }
      }]
    });
  }

  ionViewDidEnter() {
    this.createDoughnutChart(this.winRatio, this.lossRatio);
  }

}
