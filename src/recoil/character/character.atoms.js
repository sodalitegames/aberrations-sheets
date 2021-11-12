import { atom } from 'recoil';

import { getCharSheet } from './character.selectors';

export const charIdState = atom({
  key: 'charId',
  default: null,
});

export const charSheetState = atom({
  key: 'charSheet',
  default: getCharSheet,
});

export const charAugmentations = atom({
  key: 'charAugmentations',
  default: [],
});

export const charWeapons = atom({
  key: 'charWeapons',
  default: [],
});
