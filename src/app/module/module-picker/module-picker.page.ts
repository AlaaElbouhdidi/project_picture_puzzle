import { Component} from '@angular/core';
import {ModuleService} from '../module.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-module-picker',
  templateUrl: './module-picker.page.html',
  styleUrls: ['./module-picker.page.scss'],
})
export class ModulePickerPage {
  modules: any = [];


  constructor(private moduleService: ModuleService, private router: Router) {
    this.moduleService.getAllModules().then(modules => this.modules.push(...modules));
  }

  addModuleToUser(moduleID: string) {
    this.moduleService.addModuleToUser(moduleID);
    this.router.navigate(['module-list']);
  }
}
