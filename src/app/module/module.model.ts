export class Module {
  id: string;
  name: string;
  difficulty: number;

  constructor(id: string, name: string, difficulty: number) {
    this.id = id;
    this.name = name;
    this.difficulty = difficulty;
  }
}
