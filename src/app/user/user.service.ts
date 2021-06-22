import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase';
import User = firebase.User;
import { Router } from '@angular/router';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {UserData} from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userCollection: AngularFirestoreCollection<UserData>;
  userData: UserData;
  user: User | null = null;

  constructor(
    private auth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {
    this.auth.user.subscribe(user => {
      if (user) {
        this.userCollection = afs.collection<UserData>('users', ref => ref.orderBy('moduleName'));
        this.userData = new UserData();
        this.user = user;
      }
    });
  }

  async register(email: string, password: string): Promise<void> {
    try {
      await this.auth.createUserWithEmailAndPassword(email, password);
      await this.afs.collection('users').doc(this.user.uid).set({
        modulesCompleted: 0,
        puzzlesPlayed: 0,
        winRatio: 0,
        lossRatio: 0,
        sixSeries: 0,
        name: '',
        tel: ''
      });
    } catch (e) {
      throw e;
    }
  }
    findById(id: string): Promise<UserData>{
    return this.userCollection.doc(id).get()
      .toPromise()
      .then(snapshot => snapshot.data());
  }
  async loginWithPassword(email: string, password: string): Promise<void> {
    try {
      await this.auth.signInWithEmailAndPassword(email, password);
      this.findById(this.user.uid).then(data => this.userData = data);
      await this.router.navigate(['/home']);
    } catch (e) {
      throw e;
    }
  }

  async logout(): Promise<void> {
    await this.auth.signOut();
    await this.router.navigate(['/user-login']);
  }

}
