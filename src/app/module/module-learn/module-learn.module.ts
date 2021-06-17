import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModuleLearnPageRoutingModule } from './module-learn-routing.module';

import { ModuleLearnPage } from './module-learn.page';
import { StatisticRoundComponent } from '../../statistic/statistic-round/statistic-round.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModuleLearnPageRoutingModule
  ],
  declarations: [ModuleLearnPage, StatisticRoundComponent]
})
export class ModuleLearnPageModule {}
