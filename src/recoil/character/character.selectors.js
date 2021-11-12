import { selector } from 'recoil';

import { charIdState } from './character.atoms';

import sheetsApi from '../../apis/sheets.api';

export const getCharSheet = selector({
  key: 'getCharSheet',
  get: async ({ get }) => {
    if (get(charIdState)) {
      const response = await sheetsApi.get(`/characters/${get(charIdState)}`);
      return response.data.data.sheet;
    }
    return null;
  },
});
