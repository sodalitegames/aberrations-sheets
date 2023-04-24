export enum CombatantType {
  players = 'players',
  npcs = 'npcs',
  creatures = 'creatures',
}

export type Combatant = {
  _id: string;
  name: string;
  type: CombatantType;
  initiative: number;
};

export interface Combat {
  _id: string;
  sheetId: string;
  activeTurn: string;
  description: string;
  combatants: Combatant[];
}
