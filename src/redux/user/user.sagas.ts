import { takeLatest, put, all, call } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';
import { signInWithEmailAndPassword, onAuthStateChanged, signOut as _signOut } from 'firebase/auth';
import { getDoc, doc } from 'firebase/firestore';

import { store } from '../store';

import { CreateSheetForUserStartAction, FetchSheetsForUserStartAction, SignInStartAction, UserAction, UserActionTypes } from './user.types';

import {
  authStateChange,
  signInSuccess,
  signInFailure,
  signOutSuccess,
  fetchSheetsForUserSuccess,
  fetchSheetsForUserFailure,
  createSheetForUserSuccess,
  createSheetForUserFailure,
} from './user.actions';
import { closeModal, closeSlideOver, addNotification } from '../app/app.actions';

import sheetsApi, { getSheetsForPlayer, createSheetForPlayer } from '../../apis/sheets.api';

import { auth, firestore } from '../../firebase';

import { ResourceType, getResourceLabel } from '../../utils/helpers/resources';

onAuthStateChanged(auth, async user => {
  if (user) {
    const token = await user.getIdToken();

    const userSnap = await getDoc(doc(firestore, 'users', user.uid));
    const data = userSnap.data();

    if (!token || !data) {
      store.dispatch(authStateChange(null, null) as UserAction);
      return;
    }

    // @ts-expect-error //
    sheetsApi.defaults.headers.Authorization = `Bearer ${token}`;

    store.dispatch(
      authStateChange(token, {
        name: user.displayName!,
        email: user.email!,
        subscription: Boolean(data.stripe_subscription_id),
      }) as UserAction
    );
  } else {
    store.dispatch(authStateChange(null, null) as UserAction);
  }
});

// SIGN IN A USER
export function* onSignInStart() {
  yield takeLatest(UserActionTypes.SIGN_IN_START, signIn);
}

export function* signIn({ payload: { email, password } }: SignInStartAction) {
  try {
    yield signInWithEmailAndPassword(auth, email, password);

    // dispatch sign in success
    yield put(signInSuccess({ status: 'success', message: 'You have successfully signed in.' }));
  } catch (err: any) {
    console.log(err);

    let response;

    switch (err.code) {
      case 'auth/user-not-found':
        response = { status: 'error', message: 'No account found. Please sign up on our website.' };
        break;
      case 'auth/wrong-password':
        response = { status: 'error', message: 'Invalid password. Please try again.' };
        break;
      case 'auth/invalid-email':
        response = { status: 'error', message: 'Email is invalid. Please try again.' };
        break;
      case 'auth/missing-password':
        response = { status: 'error', message: 'You must provide a password. Please try again.' };
        break;
      default:
        response = { status: 'error', message: 'An error occurred. Please try again later.' };
        break;
    }

    yield put(signInFailure(response));
  }
}

// SIGN OUT A USER
export function* onSignOutStart() {
  yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut);
}

export function* signOut() {
  // use firebase to sign the user out
  yield _signOut(auth);
  // dispatch sign out success
  yield put(signOutSuccess());
}

// FETCH SHEETS FOR A USER
export function* onFetchSheetsForUserStart() {
  yield takeLatest(UserActionTypes.FETCH_SHEETS_FOR_USER_START, fetchSheetsForUser);
}

export function* fetchSheetsForUser({ payload: { sheetType } }: FetchSheetsForUserStartAction) {
  try {
    const response: AxiosResponse<any> = yield getSheetsForPlayer(sheetType);

    yield put(fetchSheetsForUserSuccess(sheetType, response.data.data.sheets));
  } catch (err: any) {
    let error;

    console.log(err.response);

    if (err.response) {
      error = err.response.data;
    }

    if (!error) {
      error = { status: 'error', message: `An error occurred while fetching your ${sheetType}.` };
    }

    yield put(fetchSheetsForUserFailure(sheetType, error));
  }
}

// CREATE A SHEET FOR A USER
export function* onCreateSheetForUserStart() {
  yield takeLatest(UserActionTypes.CREATE_SHEET_FOR_USER_START, createSheetForUser);
}

export function* createSheetForUser({ payload: { sheetType, body, config } }: CreateSheetForUserStartAction) {
  try {
    const response: AxiosResponse<any> = yield createSheetForPlayer(sheetType, body);

    yield put(createSheetForUserSuccess(sheetType, response.data.data.sheet));

    // Add a notification, if configured to do so
    if (config?.notification) yield put(addNotification(config?.notification));

    // Close out the modal, nestedModal, or slideover if it is open
    if (config?.slideOver) yield put(closeSlideOver());
    if (config?.modal) yield put(closeModal());
    if (config?.nestedModal) yield put(closeModal());
  } catch (err: any) {
    let error;

    console.log(err.response);

    if (err.response) {
      error = err.response.data;
    }

    if (!error) {
      error = { status: 'error', message: `An error occurred attempting to create your ${getResourceLabel(ResourceType[sheetType])}. Please try again later.` };
    }

    yield put(createSheetForUserFailure(sheetType, error));
  }
}

// EXPORT USER SAGAS
export function* userSagas() {
  yield all([call(onSignInStart), call(onSignOutStart), call(onFetchSheetsForUserStart), call(onCreateSheetForUserStart)]);
}
