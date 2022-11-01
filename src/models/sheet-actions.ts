export enum SheetType {
  characters = 'characters',
  campaigns = 'campaigns',
}

export enum SheetResourceType {
  logs = 'logs',
  notes = 'notes',
  invites = 'invites',
  augmentations = 'augmentations',
  weapons = 'weapons',
  wearables = 'wearables',
  consumables = 'consuambles',
  usables = 'usables',
  npcs = 'npcs',
  sessions = 'sessions',
  combats = 'combats',
  creatures = 'creatures',
  environments = 'environments',
  transactions = 'transactions',
}

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
