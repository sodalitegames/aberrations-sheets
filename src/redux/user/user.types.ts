import { AppError } from '../../models/app';
import { Sheet, SheetConfig, SheetType } from '../../models/sheet';
import { User } from '../../models/user';

export enum UserActionTypes {
  AUTH_STATE_CHANGE = 'AUTH_STATE_CHANGE',

  SIGN_IN_START = 'SIGN_IN_START',
  SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS',
  SIGN_IN_FAILURE = 'SIGN_IN_FAILURE',

  SIGN_OUT_START = 'SIGN_OUT_START',
  SIGN_OUT_SUCCESS = 'SIGN_OUT_SUCCESS',

  FETCH_SHEETS_FOR_USER_START = 'FETCH_SHEETS_FOR_USER_START',
  FETCH_SHEETS_FOR_USER_SUCCESS = 'FETCH_SHEETS_FOR_USER_SUCCESS',
  FETCH_SHEETS_FOR_USER_FAILURE = 'FETCH_SHEETS_FOR_USER_FAILURE',

  CREATE_SHEET_FOR_USER_START = 'CREATE_SHEET_FOR_USER_START',
  CREATE_SHEET_FOR_USER_SUCCESS = 'CREATE_SHEET_FOR_USER_SUCCESS',
  CREATE_SHEET_FOR_USER_FAILURE = 'CREATE_SHEET_FOR_USER_FAILURE',
}

// AUTH STATE CHANGE
interface AuthStateChangeAction {
  type: UserActionTypes.AUTH_STATE_CHANGE;
  payload: { token: string; user: User };
}

// USER SIGN IN
export interface SignInStartAction {
  type: UserActionTypes.SIGN_IN_START;
  payload: { email: string; password: string };
}

interface SignInSuccessAction {
  type: UserActionTypes.SIGN_IN_SUCCESS;
  payload: AppError;
}

interface SignInFailureAction {
  type: UserActionTypes.SIGN_IN_FAILURE;
  payload: AppError;
}

// USER SIGN OUT
export interface SignOutStartAction {
  type: UserActionTypes.SIGN_OUT_START;
}

interface SignOutSuccessAction {
  type: UserActionTypes.SIGN_OUT_SUCCESS;
}

// FETCH SHEETS FOR USER
export interface FetchSheetsForUserStartAction {
  type: UserActionTypes.FETCH_SHEETS_FOR_USER_START;
  payload: { sheetType: SheetType };
}

interface FetchSheetsForUserSuccessAction {
  type: UserActionTypes.FETCH_SHEETS_FOR_USER_SUCCESS;
  payload: { sheetType: SheetType; sheetsList: Sheet[] };
}

interface FetchSheetsForUserFailureAction {
  type: UserActionTypes.FETCH_SHEETS_FOR_USER_FAILURE;
  payload: { sheetType: SheetType; error: AppError };
}

// CREATE SHEET FOR USER
export interface CreateSheetForUserStartAction {
  type: UserActionTypes.CREATE_SHEET_FOR_USER_START;
  payload: { sheetType: SheetType; body: any; config: SheetConfig };
}

interface CreateSheetForUserSuccessAction {
  type: UserActionTypes.CREATE_SHEET_FOR_USER_SUCCESS;
  payload: { sheetType: SheetType; newSheet: Sheet };
}

interface CreateSheetForUserFailureAction {
  type: UserActionTypes.CREATE_SHEET_FOR_USER_FAILURE;
  payload: { sheetType: SheetType; error: AppError };
}

export type UserAction =
  | AuthStateChangeAction
  | SignInStartAction
  | SignInSuccessAction
  | SignInFailureAction
  | SignOutStartAction
  | SignOutSuccessAction
  | FetchSheetsForUserStartAction
  | FetchSheetsForUserSuccessAction
  | FetchSheetsForUserFailureAction
  | CreateSheetForUserStartAction
  | CreateSheetForUserSuccessAction
  | CreateSheetForUserFailureAction;
