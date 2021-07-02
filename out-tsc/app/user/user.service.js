import { __awaiter, __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { UserData } from './user.model';
let UserService = class UserService {
    constructor(auth, afs, router) {
        this.auth = auth;
        this.afs = afs;
        this.router = router;
        this.user = null;
        this.userData = new UserData();
        this.auth.user.subscribe(user => {
            if (user) {
                this.userCollection = afs.collection('users', ref => ref.orderBy('moduleName'));
                this.user = user;
            }
        });
    }
    register(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield this.auth.createUserWithEmailAndPassword(email, password);
                const userCollection = this.afs.collection('users').doc(res.user.uid);
                yield userCollection.set({
                    modulesCompleted: 0,
                    puzzlesPlayed: 0,
                    winRatio: 0,
                    lossRatio: 0,
                    correctAnswers: 0,
                    incorrectAnswers: 0,
                    sixSeries: 0,
                    language: 'eng'
                });
                yield this.importUserModule('DgdtrEC7cta3H7TBQDL5');
                yield this.importUserAchievements();
            }
            catch (e) {
                throw e;
            }
        });
    }
    findById(id) {
        return this.userCollection.doc(id).get()
            .toPromise()
            .then(snapshot => snapshot.data());
    }
    loginWithPassword(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield this.auth.signInWithEmailAndPassword(email, password);
                this.userData = yield this.findById(res.user.uid);
                yield this.router.navigate(['/home']);
            }
            catch (e) {
                throw e;
            }
        });
    }
    logout() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.auth.signOut();
            yield this.router.navigate(['/user-login']);
        });
    }
    importUserModule(moduleId) {
        return __awaiter(this, void 0, void 0, function* () {
            const module = yield this.afs.collection('modules').doc(moduleId).get().toPromise();
            yield this.afs.collection('users').doc(this.user.uid).collection('modules').doc(module.id).set(module.data());
            const snapshot = yield this.afs.collection('modules').doc(moduleId).collection('puzzles').get().toPromise();
            snapshot.docs.forEach(doc => {
                this.afs.collection('users').doc(this.user.uid).collection('modules').doc(module.id).collection('puzzles')
                    .doc(doc.id).set(doc.data());
            });
        });
    }
    importUserAchievements() {
        return __awaiter(this, void 0, void 0, function* () {
            const snapshot = yield this.afs
                .collection('achievements')
                .get()
                .toPromise();
            snapshot.docs.forEach(doc => {
                this.afs
                    .collection('users')
                    .doc(this.user.uid)
                    .collection('achievements')
                    .doc(doc.id)
                    .set(doc.data());
            });
        });
    }
    updateUserData(data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.afs
                .collection('users')
                .doc(this.user.uid)
                .update(data);
        });
    }
};
UserService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], UserService);
export { UserService };
//# sourceMappingURL=user.service.js.map