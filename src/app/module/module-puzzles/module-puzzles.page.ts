import { Component } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ModuleService} from '../module.service';
import {Puzzle} from '../puzzle.model';
import {AlertController} from '@ionic/angular';

@Component({
  selector: 'app-module-puzzles',
  templateUrl: './module-puzzles.page.html',
  styleUrls: ['./module-puzzles.page.scss'],
})
export class ModulePuzzlesPage {

  puzzles: Puzzle[] = [];
  moduleId: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private moduleService: ModuleService,
    private alertController: AlertController
  ) {
    const moduleId = this.route.snapshot.paramMap.get('moduleId');
    this.moduleId = moduleId;
    if (moduleId) {
      this.moduleService
        .getPuzzlesInUserModule(moduleId)
        .then(puzzles => {
          this.puzzles = this.filterAndShuffle(puzzles);
          this.moduleService.activePuzzles = this.puzzles;
        });
    } else {
      this.router.navigate(['/home']);
    }
  }

  selectPuzzle(puzzleId: string): void {
    this.router.navigate(['/module-learn', {puzzleId, moduleId: this.moduleId}]);
  }

  /**
   * Filters out all puzzles which were correctly answered less than six times in a row.
   * Afterwards shuffles array to place each puzzle in random order.
   *
   * @param puzzle The array of puzzles to filter and shuffle.
   */
  filterAndShuffle(puzzle: Puzzle[]): Puzzle[] {
    const filteredPuzzles = puzzle.filter(p => p.correctlyAnsweredInRow < 6);
    if (filteredPuzzles.length > 0) {
      for (let i = filteredPuzzles.length - 1; i > 0; i--) {
        const newIndex = Math.floor(Math.random() * (i + 1));
        const oldValue = filteredPuzzles[newIndex];
        filteredPuzzles[newIndex] = filteredPuzzles[i];
        filteredPuzzles[i] = oldValue;
      }
      return filteredPuzzles;
    }
    return [];
  }

  async showInfo(): Promise<void> {
    const alert = await this.alertController.create({
      cssClass: 'default-alert',
      header: 'Info',
      message: 'Pick a card from where you want to start playing the module. This allows you to play ' +
        'only the amount of cards in a module you want to play.',
      buttons: ['OK']
    });
    await alert.present();
  }

}
