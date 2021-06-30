import {Component, OnInit} from '@angular/core';
import {Module} from '../module.model';
import {ModuleService} from '../module.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-module-list',
  templateUrl: './module-list.page.html',
  styleUrls: ['./module-list.page.scss'],
})
export class ModuleListPage implements OnInit{
  modules: Module[] = [];
  modulesBackup: Module[] = [];

  constructor(private moduleService: ModuleService, private router: Router) {
    this.modulesBackup = this.modules;
  }

  ngOnInit(): void {
    this.moduleService.findAllUserModules().then(modules => this.modules.push(...modules));
  }

  startRiddle(id: string) {
    this.router.navigate(['module-puzzles', {moduleId: id}]);
    console.log('Starting Riddle: ' + id);
  }

  removeModule(id: string) {
    console.log('Remove Riddle: ' + id);
    this.moduleService.delete(id);
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

  importModule() {
    console.log('Importing Module');
    this.router.navigate(['module-picker']);
  }
}
