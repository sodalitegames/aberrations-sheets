import { Conditions, Modifier, Stat } from '../_partials';
import { Augmentation } from './Augmentation';
import { Consumable } from './Consumable';
import { Usable } from './Usable';
import { Weapon } from './Weapon';
import { Wearable } from './Wearable';

export interface Player {
  _id: string;
  playerId: string;
  playerName: string;
  playerNickname: string;
  characterName: string;
  speciesId: string;
  speciesName: string;
  charBackground: string;
  charDescription: string;

  campaign: string;

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

  augmentations: Augmentation[];
  weapons: Weapon[];
  wearables: Wearable[];
  consumables: Consumable[];
  usables: Usable[];

  active: boolean;
  archived: boolean;
}
