import UserActionTypes from './user.types';

const INITIAL_STATE = {
  token: localStorage.getItem('token'),
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
    case UserActionTypes.FETCH_CURRENT_USER_START:
      return {
        ...state,
        token: action.payload.token,
      };
    case UserActionTypes.FETCH_CURRENT_USER_SUCCESS:
      return {
        ...state,
        current: action.payload,
        error: null,
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
