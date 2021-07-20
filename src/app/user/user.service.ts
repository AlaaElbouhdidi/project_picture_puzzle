import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import firebase from 'firebase';
import {Router} from '@angular/router';
import {AngularFirestore} from '@angular/fire/firestore';
import {UserData} from './user.model';
import User = firebase.User;
import {Achievement} from '../achievement/achievement.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
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
        this.user = user;
      }
    });
  }

  /**
   * Register a new user with email, password and create a collection for the user with default values.
   *
   * @param email The email of the user.
   * @param password The password of the user.
   */
  async register(email: string, password: string): Promise<void> {
    try {
      const res = await this.auth.createUserWithEmailAndPassword(email, password);
      const userCollection = this.afs.collection('users').doc(res.user.uid);
      await userCollection.set({
        modulesCompleted: 0,
        puzzlesPlayed: 0,
        correctAnswers: 0,
        incorrectAnswers: 0,
        sixSeries: 0,
        language: 'eng'
      });
      await this.importUserModule('DgdtrEC7cta3H7TBQDL5');
      await this.importUserAchievements();
    } catch (e) {
      throw e;
    }
  }

  /**
   * Get the user data of a user by the user id.
   *
   * @param id The id of the user.
   */
  findById(id: string): Promise<UserData>{
    return this.afs.collection<UserData>('users').doc(id).get()
      .toPromise()
      .then(snapshot => snapshot.data());
  }

  /**
   * Login a user with email and password, set the user data and redirect to the home view.
   *
   * @param email The email of the user.
   * @param password The password of the user.
   */
  async loginWithPassword(email: string, password: string): Promise<void> {
    try {
      const res = await this.auth.signInWithEmailAndPassword(email, password);
      this.userData = await this.findById(res.user.uid);
      await this.router.navigate(['/home']);
    } catch (e) {
      throw e;
    }
  }

  /**
   * Logout a user and redirect to the login view.
   */
  async logout(): Promise<void> {
    await this.auth.signOut();
    await this.router.navigate(['/user-login']);
  }

  /**
   * Import a module and all its puzzles to the logged in user.
   *
   * @param moduleId The id of the module to import.
   */
  async importUserModule(moduleId: string): Promise<void> {
    const module = await this.afs.collection('modules').doc(moduleId).get().toPromise();
    await this.afs.collection('users').doc(this.user.uid).collection('modules').doc(module.id).set(module.data());

    const snapshot = await this.afs.collection('modules').doc(moduleId).collection('puzzles').get().toPromise();
    snapshot.docs.forEach(doc => {
      this.afs.collection('users').doc(this.user.uid).collection('modules').doc(module.id).collection('puzzles')
        .doc(doc.id).set(doc.data());
    });
  }

  /**
   * Import achievements to the logged in user.
   */
  async importUserAchievements(): Promise<void> {
    const snapshot = await this.afs
      .collection<Achievement>('achievements')
      .get()
      .toPromise();
    snapshot.docs.forEach(doc => {
      this.afs
        .collection<User>('users')
        .doc(this.user.uid)
        .collection<Achievement>('achievements')
        .doc(doc.id)
        .set(doc.data());
    });
  }

  /**
   * Update the data of the logged in user.
   *
   * @param data The data to update the user with.
   */
  async updateUserData(data: any): Promise<void> {
    await this.afs
      .collection<User>('users')
      .doc(this.user.uid)
      .update(data);
  }

}
