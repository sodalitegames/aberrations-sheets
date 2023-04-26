import { Conditions, Modifier, Stat, StatType } from '../_partials';

export type Type = {
  universalId: string;
  name: string;
  description: string;
};

export interface Creature {
  _id: string;
  sheetId: string;

  name: string;
  description: string;
  damageLevel: number;
  attackingStat: StatType;
  types: Type[];
  mortality: number;
  modifiers: Modifier[];
  currentHp: number;
  maxHp: number;
  conditions: Conditions;
  strength: Stat;
  agility: Stat;
  persona: Stat;
  aptitude: Stat;

  active: boolean;
  archived: boolean;

  speed: number;
  shieldValue: number;
}
