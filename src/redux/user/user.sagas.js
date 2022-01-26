import { takeLatest, put, all, call } from 'redux-saga/effects';
import Cookies from 'js-cookie';

import UserActionTypes from './user.types';

import {
  signInSuccess,
  signInFailure,
  signUpSuccess,
  signUpFailure,
  signOutSuccess,
  fetchCurrentUserSuccess,
  fetchCurrentUserFailure,
  fetchSheetsForUserSuccess,
  fetchSheetsForUserFailure,
  createSheetForUserSuccess,
  createSheetForUserFailure,
} from './user.actions';
import { setModal, setSlideOver, addNotification } from '../app/app.actions';

import authApi, { signUserIn, signUserUp, getUser } from '../../apis/auth.api';
import sheetsApi, { getSheetsForPlayer, createSheetForPlayer } from '../../apis/sheets.api';

const setCookie = token => {
  Cookies.set('token', token, { expires: 60 });
  authApi.defaults.headers.Authorization = `Bearer ${token}`;
  sheetsApi.defaults.headers.Authorization = `Bearer ${token}`;
};

const removeCookie = () => {
  Cookies.remove('token');
  delete authApi.defaults.headers.Authorization;
  delete sheetsApi.defaults.headers.Authorization;
};

// FETCH CURRENT USER
export function* onFetchCurrentUserStart() {
  yield takeLatest(UserActionTypes.FETCH_CURRENT_USER_START, fetchCurrentUser);
}

export function* fetchCurrentUser({ payload: { token } }) {
  try {
    // set api default authorization headers
    authApi.defaults.headers.Authorization = `Bearer ${token}`;
    sheetsApi.defaults.headers.Authorization = `Bearer ${token}`;

    // get the current user
    const response = yield getUser();

    const { user } = response.data.data;

    if (!user) {
      // since there is no user, remove the cookie and api default headers
      removeCookie();
      yield put(fetchCurrentUserFailure({ status: 'error', message: 'Something went wrong fetching your data. Please log in again.' }));
      return;
    }

    yield put(fetchCurrentUserSuccess(user));
  } catch (err) {
    // since token is invalid or expired, or something else is wrong, remove the cookie and api default headers
    removeCookie();
    yield put(fetchCurrentUserFailure(err.response.data));
  }
}

// SIGN IN A USER
export function* onSignInStart() {
  yield takeLatest(UserActionTypes.SIGN_IN_START, signIn);
}

export function* signIn({ payload: { email, password } }) {
  try {
    const response = yield signUserIn({ email, password });

    // check if response is a failure
    if (response.data.status === 'fail') {
      yield put(signInFailure(response.data));
      return;
    }

    if (response.data.token) {
      // add hasAccount to local storage
      localStorage.setItem('hasAccount', true);

      // set the cookie and api default headers
      setCookie(response.data.token);

      // dispatch sign in success
      yield put(signInSuccess({ token: response.data.token }));
    } else {
      yield put(signInFailure({ status: 'fail', message: 'Something went wrong. Please try again later.', error: response.data }));
    }
  } catch (err) {
    yield put(signInFailure({ status: 'fail', message: 'Something went wrong. Please try again later.', error: err.response }));
  }
}

// SIGN UP A USER
export function* onSignUpStart() {
  yield takeLatest(UserActionTypes.SIGN_UP_START, signUp);
}

export function* signUp({ payload: { name, email, password, passwordConfirm, subscribe } }) {
  try {
    const response = yield signUserUp({ name, email, password, passwordConfirm, subscribe });

    // check if response is a failure
    if (response.data.status === 'fail') {
      yield put(signInFailure(response.data));
      return;
    }

    if (response.data.token) {
      // add hasAccount to local storage
      localStorage.setItem('hasAccount', true);

      // set the cookie and api default headers
      setCookie(response.data.token);

      // dispatch the sign up success
      yield put(signUpSuccess({ token: response.data.token }));

      // save the current user to state
      // yield put(fetchCurrentUserSuccess(response.data.data.user));
    } else {
      yield put(signUpFailure({ status: 'fail', message: 'Something went wrong. Please try again later.', error: response.data }));
    }
  } catch (err) {
    yield put(signUpFailure({ status: 'fail', message: 'Something went wrong. Please try again later.', error: err.response }));
  }
}

// SIGN OUT A USER
export function* onSignOutStart() {
  yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut);
}

export function* signOut() {
  // remove the cookie and api default headers
  removeCookie();
  // dispatch sign out success
  yield put(signOutSuccess());
}

// FETCH SHEETS FOR A USER
export function* onFetchSheetsForUserStart() {
  yield takeLatest(UserActionTypes.FETCH_SHEETS_FOR_USER_START, fetchSheetsForUser);
}

export function* fetchSheetsForUser({ payload: { sheetType } }) {
  try {
    const response = yield getSheetsForPlayer(sheetType);

    yield put(fetchSheetsForUserSuccess(sheetType, response.data.data.sheets));
  } catch (err) {
    yield put(fetchSheetsForUserFailure(err.response.data));
  }
}

// CREATE A SHEET FOR A USER
export function* onCreateSheetForUserStart() {
  yield takeLatest(UserActionTypes.CREATE_SHEET_FOR_USER_START, createSheetForUser);
}

export function* createSheetForUser({ payload: { sheetType, body, config } }) {
  try {
    const response = yield createSheetForPlayer(sheetType, body);

    yield put(createSheetForUserSuccess(sheetType, response.data.data.sheet));

    // Add a notification, if configured to do so
    if (config?.notification) yield put(addNotification(config?.notification));

    // Close out the modal, nestedModal, or slideover if it is open
    if (config?.slideOver) yield put(setSlideOver(null));
    if (config?.modal) yield put(setModal(null));
    if (config?.nestedModal) yield put(setModal(null));
  } catch (err) {
    yield put(createSheetForUserFailure(err.response.data));
  }
}

// EXPORT USER SAGAS
export function* userSagas() {
  yield all([call(onFetchCurrentUserStart), call(onSignInStart), call(onSignUpStart), call(onSignOutStart), call(onFetchSheetsForUserStart), call(onCreateSheetForUserStart)]);
}
