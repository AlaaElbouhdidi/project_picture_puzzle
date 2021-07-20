import {Component, OnInit, ViewChild} from '@angular/core';
import {Statistic} from '../statistic.model';
import {Chart, registerables} from 'chart.js';
import {UserService} from '../../user/user.service';

Chart.register(...registerables);

@Component({
  selector: 'app-statistic-page',
  templateUrl: './statistic-page.page.html',
  styleUrls: ['./statistic-page.page.scss'],
})
export class StatisticPagePage implements OnInit {

  @ViewChild('winRatioChart') winRatioChart;

  puzzlesPlayed = 0;
  correctAnswers = 0;
  incorrectAnswers = 0;
  lossRatio = 0;
  sixSerienCompleted = 0;
  modulesCompleted = 0;
  winRatio = 0;

  constructor(private userService: UserService) { }

  async ngOnInit() {
    const data = await this.userService.findById(this.userService.user.uid);
    const userStatistic = new Statistic(
      data.puzzlesPlayed,
      data.correctAnswers,
      data.incorrectAnswers,
      data.sixSeries,
      data.modulesCompleted
    );
    this.puzzlesPlayed = userStatistic.puzzlesPlayed;
    this.correctAnswers = userStatistic.correctAnswers;
    this.incorrectAnswers = userStatistic.incorrectAnswers;
    this.lossRatio = userStatistic.lossRatio();
    this.winRatio = userStatistic.calcWinRatio();
    this.sixSerienCompleted = userStatistic.sixSerienCompleted;
    this.modulesCompleted = userStatistic.modulesCompleted;
  }

  /**
   * Creates a doughnut chart showing the ratio of wins to losses.
   *
   * @param winRatio The win ratio.
   * @param lossRatio The loss ratio.
   */
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
        beforeDraw: (chart) => {
          const width = chart.width;
          const height = chart.height;
          const ctx = chart.ctx;

          ctx.restore();
          const fontSize = (height / 114).toFixed(2);
          ctx.font = fontSize + 'rem sans-serif';
          ctx.textBaseline = 'middle';

          const text = winRatio + '%';
          const textX = Math.round((width - ctx.measureText(text).width) / 2);
          const textY = height / 2;

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
