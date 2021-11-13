import { atom } from 'recoil';

import { getCampSheet } from './campaign.selectors';

export const campIdState = atom({
  key: 'campId',
  default: null,
});

export const campSheetState = atom({
  key: 'charSheet',
  default: getCampSheet,
});
