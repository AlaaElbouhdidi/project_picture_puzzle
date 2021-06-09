import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModuleLearnPage } from './module-learn.page';

const routes: Routes = [
  {
    path: '',
    component: ModuleLearnPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModuleLearnPageRoutingModule {}
