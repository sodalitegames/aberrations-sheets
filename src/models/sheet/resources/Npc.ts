import { Conditions, Modifier, Stat } from '../_partials';
import { Augmentation } from './Augmentation';
import { Consumable } from './Consumable';
import { Usable } from './Usable';
import { Weapon } from './Weapon';
import { Wearable } from './Wearable';

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
  milestones: number;
  experience: number;
  conditions: Conditions;

  strength: Stat;
  agility: Stat;
  persona: Stat;
  aptitude: Stat;

  speed: number;
  shieldValue: number;

  augmentations: Augmentation[];
  weapons: Weapon[];
  wearables: Wearable[];
  consumables: Consumable[];
  usables: Usable[];

  active: boolean;
  archived: boolean;
}
