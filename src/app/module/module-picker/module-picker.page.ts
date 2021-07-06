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
  userModules: Module[] = [];
  searchbarVisible = false;

  constructor(private moduleService: ModuleService, private router: Router) {
    this.renderModules();
    this.modulesBackup = this.modules;
  }

  async renderModules() {
    this.userModules = await this.moduleService.findAllUserModules();
    this.moduleService.getAllModules().then(
      modules => {
        // eslint-disable-next-line @typescript-eslint/prefer-for-of
        for(let i = 0; i < modules.length; i++) {
          // eslint-disable-next-line @typescript-eslint/prefer-for-of
          for(let j = 0; j < this.userModules.length; j++){
            console.log('Vergleiche ' + modules[i].name + ' mit ' + this.userModules[j].name);
            if(modules[i].id === this.userModules[j].id) {
              console.log('Splice ' + modules[i].name + ' Position in Array: ' + i);
              modules.splice(i, 1);
            }
          }
        }
        this.modules.push(...modules);
        console.log(modules);
      }
    );
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
