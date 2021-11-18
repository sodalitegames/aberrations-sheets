import Cookies from 'js-cookie';

import UserActionTypes from './user.types';

const INITIAL_STATE = {
  token: Cookies.get('token'),
  current: null,
  characters: [],
  campaigns: [],
  error: null,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.SIGN_UP_SUCCESS:
      return {
        ...state,
        token: action.payload.token,
        error: null,
      };
    case UserActionTypes.SIGN_IN_SUCCESS:
      return {
        ...state,
        token: action.payload.token,
        error: null,
      };
    case UserActionTypes.SIGN_OUT_SUCCESS:
      return {
        ...state,
        current: null,
        token: null,
        characters: [],
        campaigns: [],
        error: null,
      };
    case UserActionTypes.FETCH_CURRENT_USER_SUCCESS:
      return {
        ...state,
        current: action.payload,
        error: null,
      };
    case UserActionTypes.FETCH_SHEETS_FOR_USER_SUCCESS:
      return {
        ...state,
        [action.payload.sheetType]: action.payload.sheetsList,
      };
    case UserActionTypes.CREATE_SHEET_FOR_USER_SUCCESS:
      return {
        ...state,
        [action.payload.sheetType]: [action.payload.newSheet, ...state[action.payload.sheetType]],
      };
    case UserActionTypes.FETCH_SHEETS_FOR_USER_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case UserActionTypes.CREATE_SHEET_FOR_USER_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case UserActionTypes.SIGN_IN_FAILURE:
    case UserActionTypes.SIGN_UP_FAILURE:
    case UserActionTypes.FETCH_CURRENT_USER_FAILURE:
      return {
        ...state,
        token: null,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
