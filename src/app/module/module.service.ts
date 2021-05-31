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
  private moduleCollection: AngularFirestoreCollection<Module>;
  activePuzzles: Puzzle[] = [];

  constructor(private afs: AngularFirestore, private userService: UserService) {
    this.moduleCollection = afs.collection<Module>(`modules`);
    this.modules = this.moduleCollection.valueChanges({idField: 'id'});
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

}
