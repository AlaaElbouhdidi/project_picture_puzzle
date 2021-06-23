import { Component, OnInit ,Input} from '@angular/core';
import {Router} from '@angular/router';
import { Statistic } from '../statistic.model';

@Component({
  selector: 'app-statistic-page',
  templateUrl: './statistic-page.page.html',
  styleUrls: ['./statistic-page.page.scss'],
})
export class StatisticPagePage implements OnInit {
  puzzlesPlayed: number;
  correctAnswers: number;
  incorrectAnswers: number;
  lossRatio: number;
  sixSerienCompleted : number ;
  modulesCompleted : number ;

  constructor(private router: Router) { 
  this.puzzlesPlayed = this.statistic.puzzlesPlayed;
  this.correctAnswers=this.statistic.correctAnswers;
  this.incorrectAnswers=this.statistic.incorrectAnswers;
  this.lossRatio=this.statistic.lossRatio();
  this.sixSerienCompleted=this.statistic.sixSerienCompleted;
  this.modulesCompleted=this.statistic.modulesCompleted;
  }
  @Input() statistic: Statistic;
  ngOnInit() {
  }

  back(): void {
    this.router.navigate(['/home']);
  }

}
