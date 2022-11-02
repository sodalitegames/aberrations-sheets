export type Combatant = {
  _id: string;
  name: string;
  type: 'players' | 'npcs' | 'creatures';
  initiative: number;
};

export interface Combat {
  _id: string;
  sheetId: string;
  activeTurn: string;
  description: string;
  combatants: Combatant[];
}
