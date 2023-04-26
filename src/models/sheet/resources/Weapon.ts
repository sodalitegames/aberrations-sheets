import { StatType } from '../_partials';

export type WeaponRange = 'Close' | 'Short' | 'Long' | 'Far';

export interface Weapon {
  _id: string;
  sheetId: string;
  npcId: string;
  universalId: string;
  name: string;
  nickname: string;
  description: string;
  ability: string;
  type: 'Standard' | 'Improvised' | 'Custom';
  damageModifier: number;
  associatedStat: StatType;
  range: WeaponRange;
  quantity: number;
  equipped: boolean;
  active: boolean;
  archived: boolean;
  metadata: any;
}
