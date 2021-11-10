import { selector } from 'recoil';

import authApi from '../../apis/auth.api';
import sheetsApi from '../../apis/sheets.api';

export const getCurrentUser = selector({
  key: 'getCurrentUser',
  get: async () => {
    const response = await authApi.get('/users/getMe');
    return response.data;
  },
});

export const getUsersCharacters = selector({
  key: 'getUsersCharacters',
  get: async () => {
    const response = await sheetsApi.get('/players/characters');
    return response.data.data.sheets;
  },
});

export const getUsersCampaigns = selector({
  key: 'getUsersCampaigns',
  get: async () => {
    const response = await sheetsApi.get('/players/campaigns');
    return response.data.data.sheets;
  },
});
