import { selector } from 'recoil';

import { fetchSpecies, fetchAugmentations, fetchWeapons, fetchConsumableCategories, fetchCreatureTypes } from '../../apis/manage.api';
import { charSheetState } from '../character/character.atoms';

export const getCharactersSpecies = selector({
  key: 'charactersSpecies',
  get: async ({ get }) => {
    if (get(charSheetState)) {
      const response = await fetchSpecies(`?_id=${get(charSheetState).speciesId}`);
      return response.data[0];
    }
    return null;
  },
});

export const getSpecies = selector({
  key: 'getSpecies',
  get: async () => {
    const response = await fetchSpecies();
    return response.data;
  },
});

export const getAugmentations = selector({
  key: 'getAugmentations',
  get: async () => {
    const response = await fetchAugmentations();
    return response.data;
  },
});

export const getWeapons = selector({
  key: 'getWeapons',
  get: async () => {
    const response = await fetchWeapons();
    return response.data;
  },
});

export const getConsumableCategories = selector({
  key: 'getConsumableCategories',
  get: async () => {
    const response = await fetchConsumableCategories();
    return response.data;
  },
});

export const getCreatureTypes = selector({
  key: 'getCreatureTypes',
  get: async () => {
    const response = await fetchCreatureTypes();
    return response.data;
  },
});
