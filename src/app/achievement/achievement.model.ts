export class Achievement {
  id: string;
  text: string;
  icon: string;
  description: string;
  received: boolean;
  date?: string;

  constructor(id: string, text: string, icon: string, description: string, received: boolean, date?: string) {
    this.id = id;
    this.text = text;
    this.icon = icon;
    this.description = description;
    this.received = received;
    this.date = date;
  }
}
