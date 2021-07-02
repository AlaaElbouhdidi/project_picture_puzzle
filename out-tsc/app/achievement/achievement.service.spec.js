import { TestBed } from '@angular/core/testing';
import { AchievementService } from './achievement.service';
describe('AchievementService', () => {
    let service;
    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(AchievementService);
    });
    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=achievement.service.spec.js.map