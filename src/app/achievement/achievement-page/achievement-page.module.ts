import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AchievementPagePageRoutingModule } from './achievement-page-routing.module';

import { AchievementPagePage } from './achievement-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AchievementPagePageRoutingModule
  ],
  declarations: [AchievementPagePage]
})
export class AchievementPagePageModule {}
