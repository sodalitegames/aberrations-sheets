import { selector } from 'recoil';

import { charIdState } from './character.atoms';

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
