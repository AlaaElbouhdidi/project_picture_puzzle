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

  /**
   * Sets the modules to all modules the user has not already imported.
   */
  async renderModules(): Promise<void> {
    this.userModules = await this.moduleService.findAllUserModules();
    this.moduleService.getAllModules().then(
      modules => {
        // eslint-disable-next-line @typescript-eslint/prefer-for-of
        for(let i = 0; i < modules.length; i++) {
          // eslint-disable-next-line @typescript-eslint/prefer-for-of
          for(let j = 0; j < this.userModules.length; j++){
            if(modules[i].id === this.userModules[j].id) {
              modules.splice(i, 1);
            }
          }
        }
        this.modules.push(...modules);
      }
    );
  }

  showSearchbar(): void {
    this.searchbarVisible = true;
    setTimeout(() => {
      this.search.setFocus();
    }, 500);
  }

  cancelSearch(): void {
    this.searchbarVisible = false;
    this.modules = this.modulesBackup;
  }

  /**
   * Filter the modules based on their name and the given search term.
   *
   * @param evt
   */
  filterList(evt): void {
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

  async addModuleToUser(moduleID: string): Promise<void> {
    await this.moduleService.addModuleToUser(moduleID);
    await this.router.navigate(['module-list']);
  }

}
