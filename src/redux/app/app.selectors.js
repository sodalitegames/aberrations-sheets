import { createSelector } from 'reselect';

const selectApp = state => state.app;

export const selectModal = createSelector([selectApp], app => app.modal);

export const selectSlideOver = createSelector([selectApp], app => app.slideOver);

export const selectFlashMessages = createSelector([selectApp], app => app.flashMessages);
