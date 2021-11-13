import { selector } from 'recoil';

import { getUser } from '../../apis/auth.api';
import { getSheetsForPlayer } from '../../apis/sheets.api';

export const getCurrentUser = selector({
  key: 'getCurrentUser',
  get: async () => {
    const response = await getUser();
    return response.data.data.user;
  },
});

export const getUsersCharacters = selector({
  key: 'getUsersCharacters',
  get: async () => {
    const response = await getSheetsForPlayer('characters');
    return response.data.data.sheets;
  },
});

export const getUsersCampaigns = selector({
  key: 'getUsersCampaigns',
  get: async () => {
    const response = await getSheetsForPlayer('campaigns');
    return response.data.data.sheets;
  },
});
