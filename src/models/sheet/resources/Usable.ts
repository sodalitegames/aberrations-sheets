export interface Usable {
  _id: string;
  sheetId: string;
  npcId: string;
  name: string;
  description: string;
  type: 'Common' | 'Semi-Common' | 'Rare' | 'Collectible' | 'One of a Kind';
  equippable: boolean;
  equipped: boolean;
  quantity: number;
  units: string;
  active: boolean;
  archived: boolean;
  metadata: any;
}
