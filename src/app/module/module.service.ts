import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {Module} from './module.model';
import {UserService} from '../user/user.service';
import {Puzzle} from './puzzle.model';
import firebase from 'firebase';
import User = firebase.User;

@Injectable({
  providedIn: 'root'
})
export class ModuleService {
  modules: Observable<Module[]>;
  activePuzzles: Puzzle[] = [];
  private moduleCollection: AngularFirestoreCollection<Module>;

  constructor(private afs: AngularFirestore, private userService: UserService) {
    this.moduleCollection = afs.collection<Module>(`modules`);
    this.modules = this.moduleCollection.valueChanges({idField: 'id'});
  }

  private static copyAndPrepare(puzzle: Puzzle): Puzzle {
    const copy = {...puzzle};
    delete copy.id;
    return copy;
  }

  async getPuzzlesInUserModule(moduleId: string): Promise<Puzzle[]> {
    const snapshot = await this.afs
      .collection<User>('users')
      .doc(this.userService.user.uid)
      .collection<Module>('modules')
      .doc(moduleId)
      .collection<Puzzle>('puzzles')
      .get()
      .toPromise();
    return snapshot.docs.map(doc => {
      const puzzle = doc.data();
      puzzle.id = doc.id;
      return puzzle;
    });
  }

  async updatePuzzleInModule(puzzle: Puzzle, moduleId: string): Promise<void> {
    await this.afs
      .collection<User>('users')
      .doc(this.userService.user.uid)
      .collection<Module>('modules')
      .doc(moduleId)
      .collection<Puzzle>('puzzles')
      .doc(puzzle.id)
      .update(ModuleService.copyAndPrepare(puzzle));
  }

  async findAllUserModules(): Promise<Module[]> {
    const snapshot = await this.afs
      .collection<User>('users')
      .doc(this.userService.user.uid)
      .collection<Module>('modules')
      .get()
      .toPromise();
    return snapshot.docs.map(doc => {
      const module = doc.data();
      module.id = doc.id;
      return module;
    });
  }

  async getAllModules(): Promise<Module[]> {
    const snapshot = await this.afs
      .collection<Module>('modules')
      .get()
      .toPromise();
    return snapshot.docs.map(doc => {
      const module = doc.data();
      module.id = doc.id;
      return module;
    });
  }

  async addModuleToUser(moduleID: string) {
    const module = await this.afs.collection('modules').doc(moduleID).get().toPromise();
    await this.afs.collection('users').doc(this.userService.user.uid).collection('modules').doc(module.id).set(module.data());

    const snapshot = await this.afs.collection('modules').doc(moduleID).collection('puzzles').get().toPromise();
    snapshot.docs.forEach(doc => {
      this.afs.collection('users').doc(this.userService.user.uid).collection('modules').doc(module.id).collection('puzzles')
        .doc(doc.id).set(doc.data());
    });
  }

  async removeModuleFromUser(moduleID: string) {
    await this.afs
      .collection<User>('users')
      .doc(this.userService.user.uid)
      .collection<Module>('modules')
      .doc(moduleID)
      .delete();
  }

}
