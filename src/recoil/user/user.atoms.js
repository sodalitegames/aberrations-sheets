import { atom } from 'recoil';

import { getCurrentUser, getUsersCharacters, getUsersCampaigns } from './user.selectors';

export const currentUserState = atom({
  key: 'currentUser',
  default: getCurrentUser,
});

export const usersCharactersState = atom({
  key: 'usersCharacters',
  default: getUsersCharacters,
});

export const usersCampaignsState = atom({
  key: 'usersCampaigns',
  default: getUsersCampaigns,
});
