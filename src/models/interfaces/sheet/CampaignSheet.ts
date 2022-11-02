import { Augmentation } from './resources/Augmentation';
import { Combat } from './resources/Combat';
import { Consumable } from './resources/Consumable';
import { Creature } from './resources/Creature';
import { Environment } from './resources/Environment';
import { Invite } from './resources/Invite';
import { Log } from './resources/Log';
import { Note } from './resources/Note';
import { Npc } from './resources/Npc';
import { Player } from './resources/Player';
import { Session } from './resources/Session';
import { Transaction } from './resources/Transaction';
import { Usable } from './resources/Usable';
import { Weapon } from './resources/Weapon';
import { Wearable } from './resources/Wearable';

export interface CampaignSheet {
  _id: string;

  playerId: string;
  ccName: string;
  ccNickname: string;

  name: string;
  overview: string;
  details: string;

  memos: string[];
  wallet: number;

  slug: string;

  players: Player[];
  npcs: Npc[];

  invites: Invite[];
  captainsLogs: Log[];
  sessions: Session[];
  combats: Combat[];
  environments: Environment[];
  creatures: Creature[];

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
