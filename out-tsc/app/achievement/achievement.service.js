import { __awaiter, __decorate } from "tslib";
import { Injectable } from '@angular/core';
let AchievementService = class AchievementService {
    constructor(toastCtrl, afs, userService) {
        this.toastCtrl = toastCtrl;
        this.afs = afs;
        this.userService = userService;
    }
    displayAchievementNotification() {
        return __awaiter(this, void 0, void 0, function* () {
            const toast = yield this.toastCtrl.create({
                cssClass: 'default-toast',
                message: 'Achievement unlocked!',
                duration: 2000
            });
            yield toast.present();
        });
    }
    checkAchievement(puzzlesPlayed) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = {
                received: true,
                date: new Date().toLocaleDateString()
            };
            switch (puzzlesPlayed) {
                case 10:
                    yield this.updateAchievement('MfOq2JLybuzEN9zCDNFV', data);
                    yield this.displayAchievementNotification();
                    break;
                case 25:
                    yield this.updateAchievement('XTQdCTCX79YTqvfje05z', data);
                    yield this.displayAchievementNotification();
                    break;
                case 50:
                    yield this.updateAchievement('Jzu5y82svpSQMNfLQdhl', data);
                    yield this.displayAchievementNotification();
                    break;
                case 100:
                    yield this.updateAchievement('IPfTJxibdl5zRXsVXzc4', data);
                    yield this.displayAchievementNotification();
                    break;
                case 200:
                    yield this.updateAchievement('KdyJ7A7CjLVKJM2ySnMZ', data);
                    yield this.displayAchievementNotification();
                    break;
                case 500:
                    yield this.updateAchievement('4AD0Cq5UbLwgNjkFmcpL', data);
                    yield this.displayAchievementNotification();
                    break;
            }
        });
    }
    updateAchievement(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.afs
                .collection('users')
                .doc(this.userService.user.uid)
                .collection('achievements')
                .doc(id)
                .update(data);
        });
    }
    loadUserAchievements() {
        return __awaiter(this, void 0, void 0, function* () {
            const snapshot = yield this.afs
                .collection('users')
                .doc(this.userService.user.uid)
                .collection('achievements')
                .get()
                .toPromise();
            return snapshot.docs.map(doc => {
                const achievement = doc.data();
                achievement.id = doc.id;
                return achievement;
            });
        });
    }
};
AchievementService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], AchievementService);
export { AchievementService };
//# sourceMappingURL=achievement.service.js.map