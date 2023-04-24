import { AppActionTypes, AppAction } from './app.types';

import { Modal, SlideOver, Notification, Alert } from '../../models/app';

import { replaceItemById } from '../../utils/helpers/arrays';
import { store } from '../store';
import { dismissNotification } from './app.actions';

export interface AppState {
  modal: Modal | null;
  nestedModal: Modal | null;
  slideOver: SlideOver | null;
  notifications: Notification[];
  alert: Alert | null;
}

const INITIAL_STATE = {
  modal: null,
  nestedModal: null,
  slideOver: null,
  notifications: [],
  alert: null,
};

const appReducer = (state: AppState = INITIAL_STATE, action: AppAction): AppState => {
  switch (action.type) {
    case AppActionTypes.SET_MODAL:
      return {
        ...state,
        modal: {
          ...action.payload,
          show: true,
        },
      };
    case AppActionTypes.CLOSE_MODAL:
      if (!state.modal) return state;
      return {
        ...state,
        modal: {
          ...state.modal,
          show: false,
        },
      };
    case AppActionTypes.SET_NESTED_MODAL:
      return {
        ...state,
        nestedModal: {
          ...action.payload,
          show: true,
        },
      };
    case AppActionTypes.CLOSE_NESTED_MODAL:
      if (!state.nestedModal) return state;
      return {
        ...state,
        nestedModal: {
          ...state.nestedModal,
          show: false,
        },
      };
    case AppActionTypes.SET_SLIDE_OVER:
      return {
        ...state,
        slideOver: {
          ...action.payload,
          show: true,
        },
      };
    case AppActionTypes.CLOSE_SLIDE_OVER:
      if (!state.slideOver) return state;
      return {
        ...state,
        slideOver: {
          ...state.slideOver,
          show: false,
        },
      };
    case AppActionTypes.ADD_NOTIFICATION:
      // Create the notification with the data
      const notification = { ...action.payload, _id: state.notifications.length + 1, dismissed: false };

      // Set a timeout for dismissing the notification
      setTimeout(() => {
        store.dispatch(dismissNotification(notification));
      }, 6000);

      // Add the notification into redux state
      return {
        ...state,
        notifications: [notification, ...state.notifications],
      };
    case AppActionTypes.DISMISS_NOTIFICATION:
      return {
        ...state,
        notifications: replaceItemById(state.notifications, action.payload._id.toString(), { ...action.payload, dismissed: true }),
      };
    case AppActionTypes.CLEAR_ALL_NOTIFICATIONS:
      return {
        ...state,
        notifications: [],
      };
    case AppActionTypes.SET_ALERT:
      return {
        ...state,
        alert: action.payload,
      };
    case AppActionTypes.DISMISS_ALERT:
      return {
        ...state,
        alert: null,
      };
    default:
      return state;
  }
};

export default appReducer;
