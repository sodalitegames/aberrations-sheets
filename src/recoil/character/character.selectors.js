import { selector } from 'recoil';

import { charIdState, charSheetState } from './character.atoms';

import { getSheet } from '../../apis/sheets.api';

export const getCharSheet = selector({
  key: 'getCharSheet',
  get: async ({ get }) => {
    if (get(charIdState)) {
      const response = await getSheet('characters', get(charIdState));
      console.log('Character Sheet:', response.data.data.sheet);
      return response.data.data.sheet;
    }
    return null;
  },
});

export const getEquippedWeapons = selector({
  key: 'getEquippedWeapons',
  get: ({ get }) => {
    const charSheet = get(charSheetState);
    if (charSheet) {
      return charSheet.weapons.filter(weapon => weapon.equipped);
    }
    return [];
  },
});

export const getEquippedWearables = selector({
  key: 'getEquippedWearables',
  get: ({ get }) => {
    const charSheet = get(charSheetState);
    if (charSheet) {
      return charSheet.wearables.filter(wearable => wearable.equipped);
    }
    return [];
  },
});

export const getEquippedConsumables = selector({
  key: 'getEquippedConsumables',
  get: ({ get }) => {
    const charSheet = get(charSheetState);
    if (charSheet) {
      return charSheet.consumables.filter(consumable => consumable.equipped);
    }
    return [];
  },
});

export const getEquippedUsables = selector({
  key: 'getEquippedUsables',
  get: ({ get }) => {
    const charSheet = get(charSheetState);
    if (charSheet) {
      return charSheet.usables.filter(usable => usable.equipped);
    }
    return [];
  },
});
