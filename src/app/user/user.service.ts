import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import firebase from 'firebase';
import {Router} from '@angular/router';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {UserData} from './user.model';
import User = firebase.User;

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
    this.userData = new UserData();
    this.auth.user.subscribe(user => {
      if (user) {
        this.userCollection = afs.collection<UserData>('users', ref => ref.orderBy('moduleName'));
        this.user = user;
      }
    });
  }

  async register(email: string, password: string): Promise<void> {
    try {
      const res = await this.auth.createUserWithEmailAndPassword(email, password);
      const userCollection = this.afs.collection('users').doc(res.user.uid);
      await userCollection.set({
        modulesCompleted: 0,
        puzzlesPlayed: 0,
        winRatio: 0,
        lossRatio: 0,
        correctAnswers: 0,
        incorrectAnswers: 0,
        sixSeries: 0,
        language: 'eng',
        name: '',
        tel: ''
      });
      await this.importUserModule('DgdtrEC7cta3H7TBQDL5');
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
      this.userData = await this.findById(this.user.uid);
      await this.router.navigate(['/home']);
    } catch (e) {
      throw e;
    }
  }

  async logout(): Promise<void> {
    await this.auth.signOut();
    await this.router.navigate(['/user-login']);
  }

  async importUserModule(moduleId: string): Promise<void> {
    const module = await this.afs.collection('modules').doc(moduleId).get().toPromise();
    await this.afs.collection('users').doc(this.user.uid).collection('modules').doc(module.id).set(module.data());

    const snapshot = await this.afs.collection('modules').doc(moduleId).collection('puzzles').get().toPromise();
    snapshot.docs.forEach(doc => {
      this.afs.collection('users').doc(this.user.uid).collection('modules').doc(module.id).collection('puzzles').doc(doc.id).set(doc.data());
    });
  }

  async updateUserData(data: UserData): Promise<void> {
    await this.afs
      .collection('users')
      .doc(this.user.uid)
      .update(data);
  }

}
