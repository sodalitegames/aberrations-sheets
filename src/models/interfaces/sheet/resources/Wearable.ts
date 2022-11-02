import { Modifier } from '../_partials';

enum BodyArea {
  head = 'head',
  face = 'face',
  torso = 'torso',
  arms = 'arms',
  hands = 'hands',
  legs = 'legs',
  feet = 'feet',
}

export interface Wearable {
  _id: string;
  sheetId: string;
  npcId: string;
  name: string;
  description: string;
  bodyArea: BodyArea;
  modifiers: Modifier[];
  speedAdjustment: number;
  shieldValue: number;
  quantity: number;
  equipped: boolean;
  active: boolean;
  archived: boolean;
  metadata: any;
}
