import { takeLatest, put, all, call } from 'redux-saga/effects';

import CharacterActionTypes from './character.types';

import {
  fetchCurrentCharacterSuccess,
  fetchCurrentCharacterFailure,
  updateCharacterSuccess,
  updateCharacterFailure,
  deleteCharacterSuccess,
  deleteCharacterFailure,
  fetchCharacterResourcesSuccess,
  fetchCharacterResourcesFailure,
  createCharacterResourceSuccess,
  createCharacterResourceFailure,
  updateCharacterResourceSuccess,
  updateCharacterResourceFailure,
  deleteCharacterResourceSuccess,
  deleteCharacterResourceFailure,
} from './character.actions';

import { createResource, deleteSheet, getResources, getSheet, updateResource, updateSheet } from '../../apis/sheets.api';

// FETCH CURRENT CHARACTER
export function* onFetchCurrentCharacterStart() {
  yield takeLatest(CharacterActionTypes.FETCH_CURRENT_CHARACTER_START, fetchCurrentCharacter);
}

export function* fetchCurrentCharacter({ payload: { charId } }) {
  try {
    const response = yield getSheet('characters', charId);
    yield put(fetchCurrentCharacterSuccess(response.data.data.sheet));
  } catch (err) {
    yield put(fetchCurrentCharacterFailure(err.response.data));
  }
}

// UPDATE CHARACTER
export function* onUpdateCharacterStart() {
  yield takeLatest(CharacterActionTypes.UPDATE_CHARACTER_START, updateCharacter);
}

export function* updateCharacter({ payload: { charId, body } }) {
  try {
    const response = yield updateSheet('characters', charId, body);
    yield put(updateCharacterSuccess(response.data.data.sheet));
  } catch (err) {
    yield put(updateCharacterFailure(err.response.data));
  }
}

// DELETE CHARACTER
export function* onDeleteCharacterStart() {
  yield takeLatest(CharacterActionTypes.DELETE_CHARACTER_START, deleteCharacter);
}

export function* deleteCharacter({ payload: { charId } }) {
  try {
    const response = yield deleteSheet('characters', charId);
    yield put(deleteCharacterSuccess(response.data.data));
  } catch (err) {
    yield put(deleteCharacterFailure(err.response.data));
  }
}

// GET CHARACTER RESOURCES
export function* onFetchCharacterResourcesStart() {
  yield takeLatest(CharacterActionTypes.FETCH_CHARACTER_RESOURCES_START, fetchCharacterResources);
}

export function* fetchCharacterResources({ payload: { charId, resourceType } }) {
  try {
    const response = yield getResources('characters', charId, resourceType);
    yield put(fetchCharacterResourcesSuccess(response.data.data.docs));
  } catch (err) {
    yield put(fetchCharacterResourcesFailure(err.response.data));
  }
}

// CREATE CHARACTER RESOURCE
export function* onCreateCharacterResourceStart() {
  yield takeLatest(CharacterActionTypes.CREATE_CHARACTER_RESOURCE_START, createCharacterResource);
}

export function* createCharacterResource({ payload: { charId, resourceType, body } }) {
  try {
    const response = yield createResource('characters', charId, resourceType, body);
    yield put(createCharacterResourceSuccess(response.data.data.doc));
  } catch (err) {
    yield put(createCharacterResourceFailure(err.response.data));
  }
}

// UPDATE CHARACTER RESOURCE
export function* onUpdateCharacterResourceStart() {
  yield takeLatest(CharacterActionTypes.UPDATE_CHARACTER_RESOURCE_START, updateCharacterResource);
}

export function* updateCharacterResource({ payload: { charId, resourceType, resourceId, body } }) {
  try {
    const response = yield updateResource('characters', charId, resourceType, resourceId, body);
    yield put(updateCharacterResourceSuccess(response.data.data.doc));
  } catch (err) {
    yield put(updateCharacterResourceFailure(err.response.data));
  }
}

// DELETE CHARACTER RESOURCE
export function* onDeleteCharacterResourceStart() {
  yield takeLatest(CharacterActionTypes.DELETE_CHARACTER_RESOURCE_START, deleteCharacterResource);
}

export function* deleteCharacterResource({ payload: { charId, resourceType, resourceId } }) {
  try {
    const response = yield getSheet('characters', charId, resourceType, resourceId);
    yield put(deleteCharacterResourceSuccess(response.data.data));
  } catch (err) {
    yield put(deleteCharacterResourceFailure(err.response.data));
  }
}

// EXPORT CHARACTER SAGAS
export function* characterSagas() {
  yield all([
    call(onFetchCurrentCharacterStart),
    call(onUpdateCharacterStart),
    call(onDeleteCharacterStart),
    call(onFetchCharacterResourcesStart),
    call(onCreateCharacterResourceStart),
    call(onUpdateCharacterResourceStart),
    call(onDeleteCharacterResourceStart),
  ]);
}
