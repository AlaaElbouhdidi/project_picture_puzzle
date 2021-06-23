import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AchievementPagePage } from './achievement-page.page';

const routes: Routes = [
  {
    path: '',
    component: AchievementPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AchievementPagePageRoutingModule {}
