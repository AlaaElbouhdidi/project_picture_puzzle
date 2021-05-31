import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModulePuzzlesPage } from './module-puzzles.page';

const routes: Routes = [
  {
    path: '',
    component: ModulePuzzlesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModulePuzzlesPageRoutingModule {}
