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
    this.modules = this.modulesBackup;
    const searchTerm = evt.target.value;

    if (!searchTerm) {
      return;
    }

    this.modules = this.modules.filter(module => {
      if (module.name && searchTerm) {
        return (module.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
      }
    });
  }

  async addModuleToUser(moduleID: string) {
    await this.moduleService.addModuleToUser(moduleID);
    await this.router.navigate(['module-list']);
  }

}
