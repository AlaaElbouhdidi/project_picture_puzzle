export class Module {
  id: string;
  name: string;
  difficulty: number;
  completed: boolean;

  constructor(id: string, name: string, difficulty: number, completed: boolean) {
    this.id = id;
    this.name = name;
    this.difficulty = difficulty;
    this.completed = completed;
  }
}
