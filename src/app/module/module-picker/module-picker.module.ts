import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModulePickerPageRoutingModule } from './module-picker-routing.module';

import { ModulePickerPage } from './module-picker.page';
import {NgbRatingModule} from "@ng-bootstrap/ng-bootstrap";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ModulePickerPageRoutingModule,
        NgbRatingModule
    ],
  declarations: [ModulePickerPage]
})
export class ModulePickerPageModule {}
