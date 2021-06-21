import { Component, OnInit } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, QuerySnapshot} from '@angular/fire/firestore';
import {Module} from '../module/module.model';
import {ModuleService} from '../module/module.service';

@Component({
  selector: 'app-module-list',
  templateUrl: './module-list.page.html',
  styleUrls: ['./module-list.page.scss'],
})
export class ModuleListPage {
  modules: Module[] = [];

  constructor(private moduleService: ModuleService) {
    moduleService.findAll().then(modules => this.modules.push(...modules));
    console.log(this.modules);
  }

  startRiddle(id: string) {
    console.log('Starting Riddle: ' + id);
  }

  removeModule(id: string) {
    console.log('Remove Riddle: ' + id);
    this.moduleService.delete(id); 
  }

  startSearch() {
    console.log('Starting Search');
  }
 

}
