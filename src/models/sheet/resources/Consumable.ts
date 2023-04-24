import { StatType } from '../_partials';

export type Category = {
  universalId: string;
  name: string;
  description: string;
};

export interface Consumable {
  _id: string;
  sheetId: string;
  npcId: string;
  name: string;
  description: string;
  level: number;
  uses: number;
  associatedStat: StatType;
  categories: Category[];
  equipped: boolean;
  quantity: number;
  active: boolean;
  archived: boolean;
  metadata: any;
}
