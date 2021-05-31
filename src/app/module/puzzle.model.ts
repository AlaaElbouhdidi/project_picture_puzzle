import {Answer} from './answer.model';

export class Puzzle {
  id: string;
  answers: Answer[];
  correctlyAnsweredInRow: number;
  image: string;
  question?: string;

  constructor(
    id: string,
    answers: Answer[],
    correctlyAnsweredInRow: number,
    image: string,
    question?: string
  ) {
    this.id = id;
    this.answers = answers;
    this.correctlyAnsweredInRow = correctlyAnsweredInRow;
    this.image = image;
    this.question = question;
  }
}
