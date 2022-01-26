import { createSelector } from 'reselect';

const selectCampaign = state => state.campaign;

export const selectCurrentCampaign = createSelector([selectCampaign], campaign => campaign.current);

export const selectCampaignError = createSelector([selectCampaign], campaign => campaign.error);

export const selectLoading = createSelector([selectCampaign], campaign => campaign.loading);

export const selectPermissions = createSelector([selectCampaign], campaign => campaign.reload);

export const selectReload = createSelector([selectCampaign], campaign => campaign.reload);

export const selectCompletedSessions = createSelector([selectCurrentCampaign], current => current.sessions.filter(session => session.completed));

export const selectFutureSessions = createSelector([selectCurrentCampaign], current => current.sessions.filter(session => !session.completed && !session.active));

export const selectActiveSession = createSelector([selectCurrentCampaign], current => current.sessions.find(session => session.active));

export const selectPendingTransactions = createSelector([selectCurrentCampaign], current =>
  current
    ? { sent: current.transactions.sent.filter(transac => transac.status === 'Pending'), received: current.transactions.received.filter(transac => transac.status === 'Pending') }
    : { sent: [], received: [] }
);

export const selectResolvedTransactions = createSelector([selectCurrentCampaign], current =>
  current
    ? { sent: current.transactions.sent.filter(transac => transac.status !== 'Pending'), received: current.transactions.received.filter(transac => transac.status !== 'Pending') }
    : { sent: [], received: [] }
);
