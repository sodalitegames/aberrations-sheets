import UserActionTypes from './user.types';

// USER SIGN IN
export const signInStart = userCredentials => ({
  type: UserActionTypes.SIGN_IN_START,
  payload: userCredentials,
});

export const signInSuccess = token => ({
  type: UserActionTypes.SIGN_IN_SUCCESS,
  payload: token,
});

export const signInFailure = error => ({
  type: UserActionTypes.SIGN_IN_FAILURE,
  payload: error,
});

// USER SIGN UP
export const signUpStart = userCredentials => ({
  type: UserActionTypes.SIGN_UP_START,
  payload: userCredentials,
});

export const signUpSuccess = token => ({
  type: UserActionTypes.SIGN_UP_SUCCESS,
  payload: token,
});

export const signUpFailure = error => ({
  type: UserActionTypes.SIGN_UP_FAILURE,
  payload: error,
});

// USER SIGN OUT
export const signOutStart = () => ({
  type: UserActionTypes.SIGN_OUT_START,
});

export const signOutSuccess = () => ({
  type: UserActionTypes.SIGN_OUT_SUCCESS,
});

// FETCH CURRENT USER
export const fetchCurrentUserStart = token => ({
  type: UserActionTypes.FETCH_CURRENT_USER_START,
  payload: token,
});

export const fetchCurrentUserSuccess = currentUser => ({
  type: UserActionTypes.FETCH_CURRENT_USER_SUCCESS,
  payload: currentUser,
});

export const fetchCurrentUserFailure = error => ({
  type: UserActionTypes.FETCH_CURRENT_USER_FAILURE,
  payload: error,
});

// FETCH SHEETS FOR USER
export const fetchSheetsForUserStart = sheetType => ({
  type: UserActionTypes.FETCH_SHEETS_FOR_USER_START,
  payload: sheetType,
});

export const fetchSheetsForUserSuccess = sheetsData => ({
  type: UserActionTypes.FETCH_SHEETS_FOR_USER_SUCCESS,
  payload: sheetsData,
});

export const fetchSheetsForUserFailure = error => ({
  type: UserActionTypes.FETCH_SHEETS_FOR_USER_FAILURE,
  payload: error,
});

// CREATE SHEET FOR USER
export const createSheetForUserStart = sheetData => ({
  type: UserActionTypes.CREATE_SHEET_FOR_USER_START,
  payload: sheetData,
});

export const createSheetForUserSuccess = newSheet => ({
  type: UserActionTypes.CREATE_SHEET_FOR_USER_SUCCESS,
  payload: newSheet,
});

export const createSheetForUserFailure = error => ({
  type: UserActionTypes.CREATE_SHEET_FOR_USER_FAILURE,
  payload: error,
});
