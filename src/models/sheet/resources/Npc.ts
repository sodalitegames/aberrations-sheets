import { Conditions, Modifier, Stat } from '../_partials';

export interface Npc {
  _id: string;
  sheetId: string;

  name: string;
  speciesId: string;
  speciesName: string;

  diplomacy: 'Ally' | 'Neutral' | 'Enemy';
  type: 'Combat' | 'Athlete' | 'Politician' | 'Scoundrel' | 'Academic' | 'Pedestrian';
  levelId: string;
  temperament: 'Earth' | 'Fire' | 'Water' | 'Air';

  background: string;
  description: string;

  wallet: number;
  mortality: number;
  modifiers: Modifier[];
  currentHp: number;
  maxHp: number;
  level: number;
  conditions: Conditions;

  strength: Stat;
  agility: Stat;
  persona: Stat;
  aptitude: Stat;

  speed: number;
  shieldValue: number;

  active: boolean;
  archived: boolean;
}
