import {Component, ViewChild, OnInit} from '@angular/core';
import {Module} from '../module.model';
import {ModuleService} from '../module.service';
import {Router} from '@angular/router';

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


  constructor(private moduleService: ModuleService, private router: Router) {
    this.modulesBackup = this.modules;
    //this.moduleService.findAllUserModules().then(modules => this.modules.push(...modules));
  }

  startRiddle(id: string) {
    this.router.navigate(['module-puzzles', {moduleId: id}]);
    console.log('Starting Riddle: ' + id);
  }

  removeModule(id: string) {
    console.log('Remove Riddle: ' + id);
    this.moduleService.removeModuleFromUser(id);
    this.modules.splice(0, this.modules.length);
    this.moduleService.findAllUserModules().then(modules => this.modules.push(...modules));
  }

  ionViewDidEnter() {
    this.modules.splice(0, this.modules.length);
    this.moduleService.findAllUserModules().then(modules => this.modules.push(...modules));
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
  showSearchbar(){
    this.searchbarVisible = true;
    setTimeout(() => {
      this.search.setFocus();
    }, 500);
  }
  cancelSearch(){
    this.searchbarVisible = false;
  }
  importModule() {
    this.router.navigate(['module-picker']);
  }
}
