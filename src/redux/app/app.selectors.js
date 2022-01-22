import { createSelector } from 'reselect';

const selectApp = state => state.app;

export const selectModal = createSelector([selectApp], app => app.modal);

export const selectSlideOver = createSelector([selectApp], app => app.slideOver);

export const selectAllNotifications = createSelector([selectApp], app => app.notifications);

export const selectNotifications = createSelector([selectApp], app => app.notifications.filter(not => !not.dismissed));
