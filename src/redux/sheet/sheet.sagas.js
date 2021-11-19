import { takeLatest, put, all, call } from 'redux-saga/effects';

import SheetActionTypes from './sheet.types';

import {
  fetchCurrentSheetSuccess,
  fetchCurrentSheetFailure,
  updateSheetSuccess,
  updateSheetFailure,
  deleteSheetSuccess,
  deleteSheetFailure,
  fetchSheetResourcesSuccess,
  fetchSheetResourcesFailure,
  createSheetResourceSuccess,
  createSheetResourceFailure,
  updateSheetResourceSuccess,
  updateSheetResourceFailure,
  deleteSheetResourceSuccess,
  deleteSheetResourceFailure,
} from './sheet.actions';

import { createResource, deleteSheet as deleteSheetCall, getResources, getSheet, updateResource, updateSheet as updateSheetCall } from '../../apis/sheets.api';

// FETCH CURRENT SHEET
export function* onFetchCurrentSheetStart() {
  yield takeLatest(SheetActionTypes.FETCH_CURRENT_SHEET_START, fetchCurrentSheet);
}

export function* fetchCurrentSheet({ payload: { sheetType, sheetId } }) {
  try {
    const response = yield getSheet(sheetType, sheetId);
    yield put(fetchCurrentSheetSuccess(response.data.data.sheet));
  } catch (err) {
    yield put(fetchCurrentSheetFailure(err.response.data));
  }
}

// UPDATE SHEET
export function* onUpdateSheetStart() {
  yield takeLatest(SheetActionTypes.UPDATE_SHEET_START, updateSheet);
}

export function* updateSheet({ payload: { sheetType, sheetId, body } }) {
  try {
    const response = yield updateSheetCall(sheetType, sheetId, body);
    yield put(updateSheetSuccess(response.data.data.sheet));
  } catch (err) {
    yield put(updateSheetFailure(err.response.data));
  }
}

// DELETE SHEET
export function* onDeleteSheetStart() {
  yield takeLatest(SheetActionTypes.DELETE_SHEET_START, deleteSheet);
}

export function* deleteSheet({ payload: { sheetType, sheetId } }) {
  try {
    const response = yield deleteSheetCall(sheetType, sheetId);
    yield put(deleteSheetSuccess(response.data.data));
  } catch (err) {
    yield put(deleteSheetFailure(err.response.data));
  }
}

// GET SHEET RESOURCES
export function* onFetchSheetResourcesStart() {
  yield takeLatest(SheetActionTypes.FETCH_SHEET_RESOURCES_START, fetchSheetResources);
}

export function* fetchSheetResources({ payload: { sheetType, sheetId, resourceType } }) {
  try {
    const response = yield getResources(sheetType, sheetId, resourceType);
    yield put(fetchSheetResourcesSuccess(response.data.data.docs));
  } catch (err) {
    yield put(fetchSheetResourcesFailure(err.response.data));
  }
}

// CREATE SHEET RESOURCE
export function* onCreateSheetResourceStart() {
  yield takeLatest(SheetActionTypes.CREATE_SHEET_RESOURCE_START, createSheetResource);
}

export function* createSheetResource({ payload: { sheetType, sheetId, resourceType, body } }) {
  try {
    const response = yield createResource(sheetType, sheetId, resourceType, body);
    yield put(createSheetResourceSuccess(response.data.data.doc));
  } catch (err) {
    yield put(createSheetResourceFailure(err.response.data));
  }
}

// UPDATE SHEET RESOURCE
export function* onUpdateSheetResourceStart() {
  yield takeLatest(SheetActionTypes.UPDATE_SHEET_RESOURCE_START, updateSheetResource);
}

export function* updateSheetResource({ payload: { sheetType, sheetId, resourceType, resourceId, body } }) {
  try {
    const response = yield updateResource(sheetType, sheetId, resourceType, resourceId, body);
    yield put(updateSheetResourceSuccess(response.data.data.doc));
  } catch (err) {
    yield put(updateSheetResourceFailure(err.response.data));
  }
}

// DELETE SHEET RESOURCE
export function* onDeleteSheetResourceStart() {
  yield takeLatest(SheetActionTypes.DELETE_SHEET_RESOURCE_START, deleteSheetResource);
}

export function* deleteSheetResource({ payload: { sheetType, sheetId, resourceType, resourceId } }) {
  try {
    const response = yield getSheet(sheetType, sheetId, resourceType, resourceId);
    yield put(deleteSheetResourceSuccess(response.data.data));
  } catch (err) {
    yield put(deleteSheetResourceFailure(err.response.data));
  }
}

// EXPORT SHEET SAGAS
export function* SheetSagas() {
  yield all([
    call(onFetchCurrentSheetStart),
    call(onUpdateSheetStart),
    call(onDeleteSheetStart),
    call(onFetchSheetResourcesStart),
    call(onCreateSheetResourceStart),
    call(onUpdateSheetResourceStart),
    call(onDeleteSheetResourceStart),
  ]);
}
