import {Component, ViewChild} from '@angular/core';
import {ModuleService} from '../module.service';
import {Router} from '@angular/router';
import {Module} from '../module.model';

@Component({
  selector: 'app-module-picker',
  templateUrl: './module-picker.page.html',
  styleUrls: ['./module-picker.page.scss'],
})
export class ModulePickerPage {
  @ViewChild('search') search: any;
  modules: Module[] = [];
  modulesBackup: Module[] = [];
  searchbarVisible = false;


  constructor(private moduleService: ModuleService, private router: Router) {
    this.moduleService.getAllModules().then(modules => this.modules.push(...modules));
    this.modulesBackup = this.modules;
  }

  showSearchbar() {
    this.searchbarVisible = true;
    setTimeout(() => {
      this.search.setFocus();
    }, 500);
  }

  cancelSearch() {
    this.searchbarVisible = false;
    this.modules = this.modulesBackup;
  }

  filterList(evt) {
    console.log('Starting Search');
    this.modules = this.modulesBackup;
    const searchTerm = evt.target.value;
    console.log(searchTerm);
    if (!searchTerm) {
      return;
    }

    this.modules = this.modules.filter(currentFood => {
      if (currentFood.name && searchTerm) {
        return (currentFood.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
      }
    });
  }

  addModuleToUser(moduleID: string) {
    this.moduleService.addModuleToUser(moduleID);
    this.router.navigate(['module-list']);
  }

}
