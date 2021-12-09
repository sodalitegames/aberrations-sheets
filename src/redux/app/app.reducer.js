import AppActionTypes from './app.types';

const INITIAL_STATE = {
  modal: null,
  slideOver: null,
  flashMessages: [],
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
    case AppActionTypes.ADD_FLASH_MESSAGE:
      return {
        ...state,
        flashMessages: [...state.flashMessages, action.payload],
      };
    default:
      return state;
  }
};

export default appReducer;
