import AppActionTypes from './app.types';

import { replaceItemById } from '../../utils/arrays';

const INITIAL_STATE = {
  modal: null,
  slideOver: null,
  notifications: [
    {
      _id: '1',
      heading: 'Successfully saved! 1',
      message: 'Anyone with a link can now view this file.',
      dismissed: false,
    },
    {
      _id: '2',
      heading: 'Successfully saved! 2',
      message: 'Anyone with a link can now view this file.',
      dismissed: false,
    },
    {
      _id: '3',
      heading: 'Successfully saved! 3',
      message: 'Anyone with a link can now view this file.',
      dismissed: false,
    },
  ],
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
        notifications: [...state.notifications, action.payload],
      };
    case AppActionTypes.DISMISS_NOTIFICATION:
      return {
        ...state,
        notifications: replaceItemById(state.notifications, action.payload._id, { ...action.payload, dismissed: true }),
      };
    default:
      return state;
  }
};

export default appReducer;
