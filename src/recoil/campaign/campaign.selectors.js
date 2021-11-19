import { selector } from 'recoil';

import { campIdState } from './campaign.atoms';

import { getSheet } from '../../apis/sheets.api';

export const getCampSheet = selector({
  key: 'getCampSheet',
  get: async ({ get }) => {
    if (get(campIdState)) {
      const response = await getSheet('campaigns', get(campIdState));
      return response.data.data.sheet;
    }
    return null;
  },
});
