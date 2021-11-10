import { selector } from 'recoil';

import manageApi from '../../apis/manage.api';

export const getSpecies = selector({
  key: 'getSpecies',
  get: async () => {
    const response = await manageApi.get('/species');
    return response.data;
  },
});
