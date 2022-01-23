import AppActionTypes from './app.types';

import { replaceItemById } from '../../utils/arrays';

const INITIAL_STATE = {
  modal: null,
  slideOver: null,
  notifications: [
    // {
    //   _id: '1',
    //   heading: 'Successfully saved!',
    //   message: 'Anyone with a link can now view this file.',
    //   dismissed: false,
    // }
  ],
  alert: null,
};

const appReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AppActionTypes.SET_MODAL:
      return {
        ...state,
        modal: action.payload,
      };
    case AppActionTypes.SET_SLIDE_OVER:
      return {
        ...state,
        slideOver: action.payload,
      };
    case AppActionTypes.ADD_NOTIFICATION:
      return {
        ...state,
        notifications: [...state.notifications, { ...action.payload, _id: state.notifications.length + 1, dismissed: false }],
      };
    case AppActionTypes.DISMISS_NOTIFICATION:
      return {
        ...state,
        notifications: replaceItemById(state.notifications, action.payload._id, { ...action.payload, dismissed: true }),
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
