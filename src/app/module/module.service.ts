import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {Module} from './module.model';

@Injectable({
  providedIn: 'root'
})
export class ModuleService {
  modules: Observable<Module[]>;
  private moduleCollection: AngularFirestoreCollection<Module>;

  constructor(private afs: AngularFirestore) {
    this.moduleCollection = afs.collection<Module>(`modules`);
    this.modules = this.moduleCollection.valueChanges({idField: 'id'});
  }


}
