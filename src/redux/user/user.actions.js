import UserActionTypes from './user.types';

// AUTH STATE CHANGE
export const authStateChange = (token, user) => ({
  type: UserActionTypes.AUTH_STATE_CHANGE,
  payload: { token, user },
});

// USER SIGN IN
export const signInStart = userCredentials => ({
  type: UserActionTypes.SIGN_IN_START,
  payload: userCredentials,
});

export const signInSuccess = message => ({
  type: UserActionTypes.SIGN_IN_SUCCESS,
  payload: message,
});

export const signInFailure = error => ({
  type: UserActionTypes.SIGN_IN_FAILURE,
  payload: error,
});

// USER SIGN OUT
export const signOutStart = () => ({
  type: UserActionTypes.SIGN_OUT_START,
});

export const signOutSuccess = () => ({
  type: UserActionTypes.SIGN_OUT_SUCCESS,
});

// FETCH SHEETS FOR USER
export const fetchSheetsForUserStart = sheetType => ({
  type: UserActionTypes.FETCH_SHEETS_FOR_USER_START,
  payload: { sheetType },
});

export const fetchSheetsForUserSuccess = (sheetType, sheetsList) => ({
  type: UserActionTypes.FETCH_SHEETS_FOR_USER_SUCCESS,
  payload: { sheetType, sheetsList },
});

export const fetchSheetsForUserFailure = (sheetType, error) => ({
  type: UserActionTypes.FETCH_SHEETS_FOR_USER_FAILURE,
  payload: { sheetType, error },
});

// CREATE SHEET FOR USER
export const createSheetForUserStart = (sheetType, body, config) => ({
  type: UserActionTypes.CREATE_SHEET_FOR_USER_START,
  payload: { sheetType, body, config },
});

export const createSheetForUserSuccess = (sheetType, newSheet) => ({
  type: UserActionTypes.CREATE_SHEET_FOR_USER_SUCCESS,
  payload: { sheetType, newSheet },
});

export const createSheetForUserFailure = (sheetType, error) => ({
  type: UserActionTypes.CREATE_SHEET_FOR_USER_FAILURE,
  payload: { sheetType, error },
});
