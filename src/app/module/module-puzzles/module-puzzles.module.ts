import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModulePuzzlesPageRoutingModule } from './module-puzzles-routing.module';

import { ModulePuzzlesPage } from './module-puzzles.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModulePuzzlesPageRoutingModule
  ],
  declarations: [ModulePuzzlesPage]
})
export class ModulePuzzlesPageModule {}
