export interface Session {
  _id: string;
  sheetId: string;
  name: string;
  dateScheduled: string;
  datePlayed: string;
  completed: boolean;
  active: boolean;
  content: string;
}
