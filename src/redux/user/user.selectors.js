import { createSelector } from 'reselect';

const selectUser = state => state.user;

export const selectToken = createSelector([selectUser], user => user.token);

export const selectCurrentUser = createSelector([selectUser], user => user.current);

export const selectUserError = createSelector([selectUser], user => user.error);

export const selectUserLoading = createSelector([selectUser], user => !!user.current);

export const selectUsersCharacters = createSelector([selectCurrentUser], current => current.characters);

export const selectUsersCampaigns = createSelector([selectCurrentUser], current => current.campaigns);
