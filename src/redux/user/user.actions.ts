import { UserActionTypes } from './user.types';

import { User } from '../../models/user';
import { AppError } from '../../models/app';
import { Sheet, SheetConfig, SheetType } from '../../models/sheet';

// AUTH STATE CHANGE
export const authStateChange = (token: string | null, user: User | null) => ({
  type: UserActionTypes.AUTH_STATE_CHANGE,
  payload: { token, user },
});

// USER SIGN IN
export const signInStart = (userCredentials: { email: string; password: string }) => ({
  type: UserActionTypes.SIGN_IN_START,
  payload: userCredentials,
});

export const signInSuccess = (message: AppError) => ({
  type: UserActionTypes.SIGN_IN_SUCCESS,
  payload: message,
});

export const signInFailure = (error: AppError) => ({
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
export const fetchSheetsForUserStart = (sheetType: SheetType) => ({
  type: UserActionTypes.FETCH_SHEETS_FOR_USER_START,
  payload: { sheetType },
});

export const fetchSheetsForUserSuccess = (sheetType: SheetType, sheetsList: Sheet[]) => ({
  type: UserActionTypes.FETCH_SHEETS_FOR_USER_SUCCESS,
  payload: { sheetType, sheetsList },
});

export const fetchSheetsForUserFailure = (sheetType: SheetType, error: AppError) => ({
  type: UserActionTypes.FETCH_SHEETS_FOR_USER_FAILURE,
  payload: { sheetType, error },
});

// CREATE SHEET FOR USER
export const createSheetForUserStart = (sheetType: SheetType, body: any, config: SheetConfig) => ({
  type: UserActionTypes.CREATE_SHEET_FOR_USER_START,
  payload: { sheetType, body, config },
});

export const createSheetForUserSuccess = (sheetType: SheetType, newSheet: Sheet) => ({
  type: UserActionTypes.CREATE_SHEET_FOR_USER_SUCCESS,
  payload: { sheetType, newSheet },
});

export const createSheetForUserFailure = (sheetType: SheetType, error: AppError) => ({
  type: UserActionTypes.CREATE_SHEET_FOR_USER_FAILURE,
  payload: { sheetType, error },
});
