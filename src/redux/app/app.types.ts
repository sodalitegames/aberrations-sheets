import { Modal, SlideOver, Notification, Alert } from '../../models/app';

// Action Types
export enum AppActionTypes {
  SET_MODAL = 'SET_MODAL',
  CLOSE_MODAL = 'CLOSE_MODAL',
  SET_NESTED_MODAL = 'SET_NESTED_MODAL',
  CLOSE_NESTED_MODAL = 'CLOSE_NESTED_MODAL',
  SET_SLIDE_OVER = 'SET_SLIDE_OVER',
  CLOSE_SLIDE_OVER = 'CLOSE_SLIDE_OVER',
  ADD_NOTIFICATION = 'ADD_NOTIFICATION',
  DISMISS_NOTIFICATION = 'DISMISS_NOTIFICATION',
  CLEAR_ALL_NOTIFICATIONS = 'CLEAR_ALL_NOTIFICATIONS',
  SET_ALERT = 'SET_ALERT',
  DISMISS_ALERT = 'DISMISS_ALERT',
}

// Interfaces
interface SetModalAction {
  type: AppActionTypes.SET_MODAL;
  payload: Modal;
}

interface CloseModalAction {
  type: AppActionTypes.CLOSE_MODAL;
}

interface SetNestedModalAction {
  type: AppActionTypes.SET_NESTED_MODAL;
  payload: Modal;
}

interface CloseNestedModalAction {
  type: AppActionTypes.CLOSE_NESTED_MODAL;
}

interface SetSlideOverAction {
  type: AppActionTypes.SET_SLIDE_OVER;
  payload: SlideOver;
}

interface CloseSlideOverAction {
  type: AppActionTypes.CLOSE_SLIDE_OVER;
}

interface AddNotificationAction {
  type: AppActionTypes.ADD_NOTIFICATION;
  payload: Notification;
}

interface DismissNotificationAction {
  type: AppActionTypes.DISMISS_NOTIFICATION;
  payload: Notification;
}

interface ClearAllNotificationsAction {
  type: AppActionTypes.CLEAR_ALL_NOTIFICATIONS;
}

interface SetAlertAction {
  type: AppActionTypes.SET_ALERT;
  payload: Alert;
}

interface DismissAlertAction {
  type: AppActionTypes.DISMISS_ALERT;
}

// Export Interface Types
export type AppAction =
  | SetModalAction
  | CloseModalAction
  | SetNestedModalAction
  | CloseNestedModalAction
  | SetSlideOverAction
  | CloseSlideOverAction
  | AddNotificationAction
  | DismissNotificationAction
  | ClearAllNotificationsAction
  | SetAlertAction
  | DismissAlertAction;
