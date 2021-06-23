import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StatisticPagePageRoutingModule } from './statistic-page-routing.module';

import { StatisticPagePage } from './statistic-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StatisticPagePageRoutingModule
  ],
  declarations: [StatisticPagePage]
})
export class StatisticPagePageModule {}
