import AppActionTypes from './app.types';

export const setModal = modal => ({
  type: AppActionTypes.SET_MODAL,
  payload: modal,
});

export const setNestedModal = nestedModal => ({
  type: AppActionTypes.SET_NESTED_MODAL,
  payload: nestedModal,
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

export const clearAllNotifications = () => ({
  type: AppActionTypes.CLEAR_ALL_NOTIFICATIONS,
});

export const setAlert = alert => ({
  type: AppActionTypes.SET_ALERT,
  payload: alert,
});

export const dismissAlert = () => ({
  type: AppActionTypes.DISMISS_ALERT,
});
