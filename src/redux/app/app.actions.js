import AppActionTypes from './app.types';

export const setModal = modal => ({
  type: AppActionTypes.SET_MODAL,
  payload: modal,
});

export const setSlideOver = slideOver => ({
  type: AppActionTypes.SET_SLIDE_OVER,
  payload: slideOver,
});

export const addNotification = notification => ({
  type: AppActionTypes.ADD_NOTIFICATION,
  payload: notification,
});

export const dismissNotification = notification => ({
  type: AppActionTypes.DISMISS_NOTIFICATION,
  payload: notification,
});
