import { Component, OnInit } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, QuerySnapshot} from '@angular/fire/firestore';
import {Module} from '../module.model';
import {ModuleService} from '../module.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-module-list',
  templateUrl: './module-list.page.html',
  styleUrls: ['./module-list.page.scss'],
})
export class ModuleListPage {
  modules: Module[] = [];

  constructor(private moduleService: ModuleService, private router: Router) {
    moduleService.findAll().then(modules => this.modules.push(...modules));
    console.log(this.modules);
  }

  startRiddle(id: string) {
    this.router.navigate(['module-puzzles', {moduleId: id}]);
    console.log('Starting Riddle: ' + id);
  }

  removeModule(id: string) {
    console.log('Remove Riddle: ' + id);
    this.moduleService.delete(id);
  }

  startSearch() {
    console.log('Starting Search');
  }

  importModule() {
    console.log('Importing Module');
  }
}
