import { createSelector } from 'reselect';

const selectUser = state => state.user;

export const selectToken = createSelector([selectUser], user => user.token);

export const selectCurrentUser = createSelector([selectUser], user => user.current);

export const selectUserError = createSelector([selectUser], user => user.error);

export const selectUsersCharacters = createSelector([selectUser], user => user.characters);

export const selectUsersCampaigns = createSelector([selectUser], user => user.campaigns);
