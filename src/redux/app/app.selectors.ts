import { createSelector } from 'reselect';

import { RootState } from '../root-reducer';

const selectApp = (state: RootState) => state.app;

export const selectModal = createSelector([selectApp], app => app.modal);

export const selectNestedModal = createSelector([selectApp], app => app.nestedModal);

export const selectSlideOver = createSelector([selectApp], app => app.slideOver);

export const selectAllNotifications = createSelector([selectApp], app => app.notifications);

export const selectNotifications = createSelector([selectApp], app => app.notifications.filter(not => !not.dismissed));

export const selectAlert = createSelector([selectApp], app => app.alert);
