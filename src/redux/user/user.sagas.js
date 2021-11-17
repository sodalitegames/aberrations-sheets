import { takeLatest, put, all, call } from 'redux-saga/effects';

import UserActionTypes from './user.types';

import { signInSuccess, signInFailure, signUpSuccess, signUpFailure, fetchCurrentUserSuccess, fetchCurrentUserFailure, signOutSuccess } from './user.actions';

import { signUserIn, signUserUp, fetchUser } from '../api/auth.api';

// FETCH CURRENT USER
export function* onFetchCurrentUserStart() {
  yield takeLatest(UserActionTypes.FETCH_CURRENT_USER_START, fetchCurrentUser);
}

export function* fetchCurrentUser({ payload: { token } }) {
  try {
    const response = yield fetchUser(token);

    // check if response is a failure
    if (response.data.status === 'fail') {
      yield put(fetchCurrentUserFailure(response.data));
      return;
    }

    yield put(fetchCurrentUserSuccess(response.data.data.user));
  } catch (err) {
    // since token is invalid or expired, remove from local storage
    localStorage.removeItem('token');
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
      // add token and hasAccount to local storage to persist signins
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('hasAccount', true);

      console.log(response.data.data);

      // dispatch sign in success
      yield put(signInSuccess({ token: response.data.token }));

      // save the current user to state
      yield put(fetchCurrentUserSuccess(response.data.data.user));
    } else {
      yield put(signInFailure({ status: 'fail', message: 'Something went wrong. Please try again later.', error: response.data }));
    }
  } catch (err) {
    console.log(err.response);
    yield put(signInFailure({ status: 'fail', message: 'Something went wrong. Please try again later.', error: err.response }));
  }
}

// SIGN A USER UP
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
      // add token and hasAccount to local storage to persist signins
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('hasAccount', true);

      // dispatch the sign up success
      yield put(signUpSuccess({ token: response.data.token }));

      // save the current user to state
      yield put(fetchCurrentUserSuccess(response.data.data.user));
    } else {
      yield put(signUpFailure({ status: 'fail', message: 'Something went wrong. Please try again later.', error: response.data }));
    }
  } catch (err) {
    console.log(err.response);
    yield put(signUpFailure({ status: 'fail', message: 'Something went wrong. Please try again later.', error: err.response }));
  }
}

// SIGN A USER OUT
export function* onSignOutStart() {
  yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut);
}

export function* signOut() {
  // remove token from local storage
  localStorage.removeItem('token');
  yield put(signOutSuccess());
}

// EXPORT USER SAGAS
export function* userSagas() {
  yield all([call(onFetchCurrentUserStart), call(onSignInStart), call(onSignUpStart), call(onSignOutStart)]);
}
