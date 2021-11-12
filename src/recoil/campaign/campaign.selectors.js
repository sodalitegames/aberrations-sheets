import { selector } from 'recoil';

import { campIdState } from './campaign.atoms';

import sheetsApi from '../../apis/sheets.api';

export const getCampSheet = selector({
  key: 'getCampSheet',
  get: async ({ get }) => {
    if (get(campIdState)) {
      const response = await sheetsApi.get(`/campaigns/${get(campIdState)}`);
      return response.data.data.sheet;
    }
    return null;
  },
});
