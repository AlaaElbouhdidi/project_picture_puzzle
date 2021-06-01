import { Component } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ModuleService} from '../module.service';
import {Puzzle} from '../puzzle.model';

@Component({
  selector: 'app-module-puzzles',
  templateUrl: './module-puzzles.page.html',
  styleUrls: ['./module-puzzles.page.scss'],
})
export class ModulePuzzlesPage {

  puzzles: Puzzle[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private moduleService: ModuleService
  ) {
    const moduleId = this.route.snapshot.paramMap.get('moduleId');
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
    this.router.navigate(['/module-learn', {puzzleId}]);
  }

  filterAndShuffle(puzzle: Puzzle[]): Puzzle[] {
    const filteredPuzzles = puzzle.filter(p => p.correctlyAnsweredInRow < 6);
    for (let i = filteredPuzzles.length - 1; i > 0; i--) {
      const newIndex = Math.floor(Math.random() * (i + 1));
      const oldValue = filteredPuzzles[newIndex];
      filteredPuzzles[newIndex] = filteredPuzzles[i];
      filteredPuzzles[i] = oldValue;
    }
    return filteredPuzzles;
  }

}
