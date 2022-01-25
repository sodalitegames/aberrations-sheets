import AppActionTypes from './app.types';

import { replaceItemById } from '../../utils/arrays';
import { store } from '../store';
import { dismissNotification } from './app.actions';

const INITIAL_STATE = {
  modal: null,
  nestedModal: null,
  slideOver: null,
  notifications: [],
  alert: null,
};

const appReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AppActionTypes.SET_MODAL:
      return {
        ...state,
        modal: action.payload,
      };
    case AppActionTypes.SET_NESTED_MODAL:
      return {
        ...state,
        nestedModal: action.payload,
      };
    case AppActionTypes.SET_SLIDE_OVER:
      return {
        ...state,
        slideOver: action.payload,
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
        notifications: replaceItemById(state.notifications, action.payload._id, { ...action.payload, dismissed: true }),
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
