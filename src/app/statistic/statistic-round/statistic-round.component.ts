import {Component, Input, OnInit} from '@angular/core';
import {Statistic} from '../statistic.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-statistic-round',
  templateUrl: './statistic-round.component.html',
  styleUrls: ['./statistic-round.component.scss'],
})
export class StatisticRoundComponent implements OnInit {

  @Input() statistic: Statistic;
  message = '';

  constructor(private router: Router) { }

  ngOnInit() {
    this.message = this.getMessage();
  }

  /**
   * Gets a message depending on the win ratio.
   */
  getMessage(): string {
    const winRatio = this.statistic.winRatio();
    if (winRatio < 20) {
      return 'Keep learning!';
    } else if (winRatio < 40) {
      return 'You are getting better!';
    } else if (winRatio < 60) {
      return 'Good!';
    } else if (winRatio < 80) {
      return 'Well done!';
    } else if (winRatio < 100) {
      return 'Excellent!';
    } else if (winRatio === 100) {
      return 'PERFECT!';
    } else {
      return '';
    }
  }

  nextRound(): void {
    this.router.navigate(['/module-list']);
  }

}
