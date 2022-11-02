import { Weapon } from './resources/Weapon';
import { Augmentation } from './resources/Augmentation';
import { Invite } from './resources/Invite';
import { Log } from './resources/Log';
import { Note } from './resources/Note';
import { Transaction } from './resources/Transaction';
import { Wearable } from './resources/Wearable';

import { Modifier, Conditions, Stat } from './_partials';
import { Usable } from './resources/Usable';
import { Consumable } from './resources/Consumable';

export type Campaign = {
  name: string;
  overview: string;
  ccName: string;
  ccNickname: string;
  players: PlayerMin[];
};

type PlayerMin = {
  characterName: string;
  playerName: string;
  playerNickname: string;
};

export interface CharacterSheet {
  _id: string;
  playerId: string;
  playerName: string;
  playerNickname: string;
  characterName: string;
  speciesId: string;
  speciesName: string;
  charBackground: string;
  charDescription: string;

  campaign: Campaign | null;

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

  slug: string;
  active: boolean;

  speed: number;
  shieldValue: number;

  invites: Invite[];
  characterLogs: Log[];

  transactions: {
    sent: Transaction[];
    received: Transaction[];
  };

  notes: Note[];
  augmentations: Augmentation[];
  weapons: Weapon[];
  wearables: Wearable[];
  consumables: Consumable[];
  usables: Usable[];
}
