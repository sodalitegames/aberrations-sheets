import { AppActionTypes } from './app.types';

import { Alert, Modal, SlideOver, Notification } from '../../models/interfaces/app';

import { SheetNotification } from '../../models/sheet-actions';

export const setModal = (modal: Modal) => ({
  type: AppActionTypes.SET_MODAL,
  payload: modal,
});

export const closeModal = () => ({
  type: AppActionTypes.CLOSE_MODAL,
});

export const setNestedModal = (nestedModal: Modal) => ({
  type: AppActionTypes.SET_NESTED_MODAL,
  payload: nestedModal,
});

export const closeNestedModal = () => ({
  type: AppActionTypes.CLOSE_NESTED_MODAL,
});

export const setSlideOver = (slideOver: SlideOver) => ({
  type: AppActionTypes.SET_SLIDE_OVER,
  payload: slideOver,
});

export const closeSlideOver = () => ({
  type: AppActionTypes.CLOSE_SLIDE_OVER,
});

export const addNotification = (notification: SheetNotification) => ({
  type: AppActionTypes.ADD_NOTIFICATION,
  payload: notification,
});

export const dismissNotification = (notification: Notification) => ({
  type: AppActionTypes.DISMISS_NOTIFICATION,
  payload: notification,
});

export const clearAllNotifications = () => ({
  type: AppActionTypes.CLEAR_ALL_NOTIFICATIONS,
});

export const setAlert = (alert: Alert) => ({
  type: AppActionTypes.SET_ALERT,
  payload: alert,
});

export const dismissAlert = () => ({
  type: AppActionTypes.DISMISS_ALERT,
});
