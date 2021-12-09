import { createSelector } from 'reselect';

const selectResources = state => state.resources;

export const selectSpecies = createSelector([selectResources], resources => resources.species);

export const selectWeapons = createSelector([selectResources], resources => resources.weapons);

export const selectAugmentations = createSelector([selectResources], resources => resources.augmentations);

export const selectConsumableCategories = createSelector([selectResources], resources => resources.consumableCategories);

export const selectCreatureTypes = createSelector([selectResources], resources => resources.creatureTypes);
