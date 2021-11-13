import { selector } from 'recoil';

import { fetchSpecies, fetchAugmentations, fetchWeapons, fetchConsumableCategories, fetchCreatureTypes } from '../../apis/manage.api';
import { charSheetState } from '../character/character.atoms';

export const getCharactersSpecies = selector({
  key: 'charactersSpecies',
  get: async ({ get }) => {
    if (get(charSheetState)) {
      const response = await fetchSpecies(`?_id=${get(charSheetState).speciesId}`);
      console.log(`Character's Species:`, response.data[0]);
      return response.data[0];
    }
    return null;
  },
});

export const getSpecies = selector({
  key: 'getSpecies',
  get: async () => {
    const response = await fetchSpecies();
    console.log('Species:', response.data);
    return response.data;
  },
});

export const getAugmentations = selector({
  key: 'getAugmentations',
  get: async () => {
    const response = await fetchAugmentations();
    console.log('Augmentations:', response.data);
    return response.data;
  },
});

export const getWeapons = selector({
  key: 'getWeapons',
  get: async () => {
    const response = await fetchWeapons();
    console.log('Weapons:', response.data);
    return response.data;
  },
});

export const getConsumableCategories = selector({
  key: 'getConsumableCategories',
  get: async () => {
    const response = await fetchConsumableCategories();
    console.log('Consumable Categories:', response.data);
    return response.data;
  },
});

export const getCreatureTypes = selector({
  key: 'getCreatureTypes',
  get: async () => {
    const response = await fetchCreatureTypes();
    console.log('Creature Types:', response.data);
    return response.data;
  },
});
