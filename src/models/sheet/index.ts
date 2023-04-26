import { CampaignSheet } from './CampaignSheet';
import { CharacterSheet } from './CharacterSheet';
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

export * from './CharacterSheet';
export * from './CampaignSheet';
export * from './_partials';

export type Sheet = CharacterSheet | CampaignSheet;

export enum SheetType {
  characters = 'characters',
  campaigns = 'campaigns',
}

export enum EntityType {
  characters = 'characters',
  campaigns = 'campaigns',
  players = 'players',
}

export type SheetResource = Augmentation | Combat | Consumable | Creature | Environment | Invite | Log | Note | Npc | Session | Transaction | Usable | Weapon | Wearable;

export enum SheetResourceType {
  logs = 'logs',
  notes = 'notes',
  invites = 'invites',
  augmentations = 'augmentations',
  weapons = 'weapons',
  wearables = 'wearables',
  consumables = 'consumables',
  usables = 'usables',
  npcs = 'npcs',
  sessions = 'sessions',
  combats = 'combats',
  creatures = 'creatures',
  environments = 'environments',
  transactions = 'transactions',
}

export enum CharacterResourceType {
  notes = 'notes',
  invites = 'invites',
  augmentations = 'augmentations',
  weapons = 'weapons',
  wearables = 'wearables',
  consumables = 'consumables',
  usables = 'usables',
}

export enum CampaignResourceType {
  notes = 'notes',
  invites = 'invites',
  augmentations = 'augmentations',
  weapons = 'weapons',
  wearables = 'wearables',
  consumables = 'consumables',
  usables = 'usables',
  npcs = 'npcs',
  sessions = 'sessions',
  combats = 'combats',
  creatures = 'creatures',
  environments = 'environments',
}

export enum PlayerResourceType {
  augmentations = 'augmentations',
  weapons = 'weapons',
  wearables = 'wearables',
  consumables = 'consumables',
  usables = 'usables',
}

export type Belonging = Weapon | Wearable | Consumable | Usable;

export enum BelongingType {
  weapons = 'weapons',
  wearables = 'wearables',
  consumables = 'consumables',
  usables = 'usables',
}

// More...

export type SheetPermissions = {
  isCC: boolean;
};

export type SheetConfig = {
  forPlayer?: boolean;
  notification?: SheetNotification;
  slideOver?: boolean;
  modal?: boolean;
  nestedModal?: boolean;
};

export type SheetNotification = {
  status: string;
  message: string;
  heading: string;
};

export type Interactable = Weapon | Wearable | Consumable | Usable | Creature | Npc | Environment | Player;

export enum InteractableType {
  weapons = 'weapons',
  wearables = 'wearables',
  consumables = 'consumables',
  usables = 'usables',
  npcs = 'npcs',
  creatures = 'creatures',
  environments = 'environments',
  players = 'players',
}
