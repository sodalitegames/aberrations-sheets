import { createSelector } from 'reselect';

const selectResources = state => state.resources;

export const selectResourceError = createSelector([selectResources], resources => resources.error);

export const selectSpecies = createSelector([selectResources], resources => resources.species);

export const selectWeapons = createSelector([selectResources], resources => resources.weapons);

export const selectAugmentations = createSelector([selectResources], resources => resources.augmentations);

export const selectConsumableCategories = createSelector([selectResources], resources => resources.consumableCategories);

export const selectCreatureTypes = createSelector([selectResources], resources => resources.creatureTypes);

export const selectNpcTypes = createSelector([selectResources], resources => resources.npcTypes);
