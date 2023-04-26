export enum ResourceType {
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
  players = 'players',
  characters = 'characters',
}

export const getResourceLabel = (resourceType: ResourceType): string => {
  switch (resourceType) {
    case ResourceType.logs:
      return 'log';
    case ResourceType.notes:
      return 'note';
    case ResourceType.invites:
      return 'invite';
    case ResourceType.augmentations:
      return 'augmentation';
    case ResourceType.weapons:
      return 'weapon';
    case ResourceType.wearables:
      return 'wearable';
    case ResourceType.consumables:
      return 'consumable';
    case ResourceType.usables:
      return 'usable';
    case ResourceType.npcs:
      return 'npc';
    case ResourceType.sessions:
      return 'session';
    case ResourceType.combats:
      return 'combat';
    case ResourceType.creatures:
      return 'creature';
    case ResourceType.environments:
      return 'environment';
    case ResourceType.transactions:
      return 'transaction';
    case ResourceType.players:
      return 'player';
    case ResourceType.characters:
      return 'character';
    default:
      return '[resource]';
  }
};
