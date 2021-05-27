import { Component } from '@angular/core';
import {ModuleService} from '../module/module.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private moduleService: ModuleService) {
    console.log(this.moduleService.modules);
  }

}
