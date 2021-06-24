import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModuleListPageRoutingModule } from './module-list-routing.module';

import { ModuleListPage } from './module-list.page';
import {NgbRatingModule} from "@ng-bootstrap/ng-bootstrap";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ModuleListPageRoutingModule,
        NgbRatingModule
    ],
  declarations: [ModuleListPage]
})
export class ModuleListPageModule {}
