import { createSelector } from 'reselect';

import { RootState } from '../root-reducer';

const selectResources = (state: RootState) => state.resources;

export const selectResourceError = createSelector([selectResources], resources => resources.error);

export const selectSpecies = createSelector([selectResources], resources => resources.species);

export const selectWeapons = createSelector([selectResources], resources => resources.weapons);

export const selectAugmentationGroups = createSelector([selectResources], resources => resources.augmentationGroups);

export const selectConsumableCategories = createSelector([selectResources], resources => resources.consumableCategories);

export const selectCreatureTypes = createSelector([selectResources], resources => resources.creatureTypes);

export const selectNpcTypes = createSelector([selectResources], resources => resources.npcTypes);
