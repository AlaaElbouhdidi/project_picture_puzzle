export class Achievement {
  id: string;
  text: string;
  icon: string;
  description: string;
  date?: string;

  constructor(id: string, text: string, icon: string, description: string, date?: string) {
    this.id = id;
    this.text = text;
    this.icon = icon;
    this.description = description;
    this.date = date;
  }
}
