export * from './AugmentationGroup';
export * from './ConsumableCategory';
export * from './CreatureType';
export * from './NpcType';
export * from './Species';
export * from './Weapon';

export enum FetchedResourceType {
  Species = 'species',
  Weapons = 'weapons',
  AugmentationGroups = 'augmentationGroups',
  ConsumableCategories = 'consumableCategories',
  CreatureTypes = 'creatureTypes',
  NpcTypes = 'npcTypes',
}
