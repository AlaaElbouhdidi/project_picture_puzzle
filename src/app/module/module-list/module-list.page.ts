import {Component, ViewChild} from '@angular/core';
import {Module} from '../module.model';
import {ModuleService} from '../module.service';
import {Router} from '@angular/router';
import {AlertController, IonItemSliding} from '@ionic/angular';

@Component({
  selector: 'app-module-list',
  templateUrl: './module-list.page.html',
  styleUrls: ['./module-list.page.scss'],
})
export class ModuleListPage {
  @ViewChild('search') search: any;
  modules: Module[] = [];
  modulesBackup: Module[] = [];
  searchbarVisible = false;

  constructor(private moduleService: ModuleService, private router: Router, private alertController: AlertController) {
    this.modulesBackup = this.modules;
  }

  startRiddle(id: string): void {
    this.router.navigate(['module-puzzles', {moduleId: id}]);
  }

  /**
   * Show confirmation alert to remove module and handle corresponding action.
   *
   * @param id The id of the module to remove.
   * @param item The sliding item to close if alert is cancelled.
   */
  async removeModule(id: string, item: IonItemSliding): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Delete module',
      cssClass: 'default-alert',
      message: 'Are you sure you want to delete this module?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            this.alertController.dismiss();
            item.close();
          }
        }, {
          text: 'Confirm',
          handler: async () => {
            await this.moduleService.removeModuleFromUser(id);
            this.modules.splice(0, this.modules.length);
            this.moduleService.findAllUserModules().then(modules => this.modules.push(...modules));
          }
        }
      ]
    });
    await alert.present();
  }

  ionViewDidEnter() {
    this.modules.splice(0, this.modules.length);
    this.moduleService.findAllUserModules().then(modules => this.modules.push(...modules));
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

  importModule(): void {
    this.router.navigate(['module-picker']);
  }

}
