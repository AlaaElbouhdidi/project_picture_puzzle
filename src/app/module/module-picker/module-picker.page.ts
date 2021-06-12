import { Component, OnInit, ViewChild } from '@angular/core';
import {IonSearchbar, ModalController} from '@ionic/angular';
import {ModuleService} from '../module.service';

@Component({
  selector: 'app-module-picker',
  templateUrl: './module-picker.page.html',
  styleUrls: ['./module-picker.page.scss'],
})
export class ModulePickerPage implements OnInit {

  modules: any = [];
  filteredModules: any = [];
  @ViewChild(IonSearchbar) private searchbar: IonSearchbar;
  searchTerm = '';
  isempty = false;

  
  constructor(private modalController: ModalController, private moduleService: ModuleService) {
    this.filteredModules = this.modules;
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  ionViewDidEnter() {
    this.searchbar.setFocus();
    setTimeout(() => this.searchbar.setFocus(), 10);
  }

  doSearch($event) {
    this.filteredModules = this.modules.filter((module) => {
      return (module.name.includes($event.target.value)
          || module.name.toLowerCase().includes($event.target.value) || module.name.toLowerCase().includes($event.target.value));
    });
  }

}
