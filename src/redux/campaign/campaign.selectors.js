import { createSelector } from 'reselect';

const selectCampaign = state => state.campaign;

export const selectCurrentCampaign = createSelector([selectCampaign], campaign => campaign.current);
