import { takeLatest, takeEvery, put, all, call } from 'redux-saga/effects';

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

import { createResource, deleteResource, deleteSheet as deleteSheetCall, getResources, getSheet, updateResource, updateSheet as updateSheetCall } from '../../apis/sheets.api';
import { fetchSpecies } from '../../apis/manage.api';

// FETCH CURRENT SHEET
export function* onFetchCurrentSheetStart() {
  yield takeLatest(SheetActionTypes.FETCH_CURRENT_SHEET_START, fetchCurrentSheet);
}

export function* fetchCurrentSheet({ payload: { sheetType, sheetId } }) {
  try {
    const response = yield getSheet(sheetType, sheetId);

    if (sheetType === 'characters') {
      // If it is a character sheet, fetch the species data and append it to the sheet data
      const resourceResponse = yield fetchSpecies(`?_id=${response.data.data.sheet.speciesId}`);
      const { id, name, ability, appearance, basicInfo, stats } = resourceResponse.data[0];
      yield put(fetchCurrentSheetSuccess(sheetType, { ...response.data.data.sheet, species: { id, name, ability, appearance, basicInfo, stats } }));
      return;
    }

    yield put(fetchCurrentSheetSuccess(sheetType, response.data.data.sheet));
  } catch (err) {
    yield put(fetchCurrentSheetFailure(sheetType, err.response.data));
  }
}

// UPDATE SHEET
export function* onUpdateSheetStart() {
  yield takeLatest(SheetActionTypes.UPDATE_SHEET_START, updateSheet);
}

export function* updateSheet({ payload: { sheetType, sheetId, body } }) {
  try {
    const response = yield updateSheetCall(sheetType, sheetId, body);
    yield put(updateSheetSuccess(sheetType, response.data.data.sheet));
  } catch (err) {
    yield put(updateSheetFailure(sheetType, err.response.data));
  }
}

// DELETE SHEET
export function* onDeleteSheetStart() {
  yield takeLatest(SheetActionTypes.DELETE_SHEET_START, deleteSheet);
}

export function* deleteSheet({ payload: { sheetType, sheetId } }) {
  try {
    const response = yield deleteSheetCall(sheetType, sheetId);
    console.log('Deleted Sheet', response.data);
    yield put(deleteSheetSuccess(sheetType, sheetId, response.data.data));
  } catch (err) {
    yield put(deleteSheetFailure(sheetType, err.response.data));
  }
}

// GET SHEET RESOURCES
export function* onFetchSheetResourcesStart() {
  yield takeLatest(SheetActionTypes.FETCH_SHEET_RESOURCES_START, fetchSheetResources);
}

export function* fetchSheetResources({ payload: { sheetType, sheetId, resourceType } }) {
  try {
    const response = yield getResources(sheetType, sheetId, resourceType);
    yield put(fetchSheetResourcesSuccess(sheetType, response.data.data.docs));
  } catch (err) {
    yield put(fetchSheetResourcesFailure(sheetType, err.response.data));
  }
}

// CREATE SHEET RESOURCE
export function* onCreateSheetResourceStart() {
  yield takeLatest(SheetActionTypes.CREATE_SHEET_RESOURCE_START, createSheetResource);
}

export function* createSheetResource({ payload: { sheetType, sheetId, resourceType, body } }) {
  try {
    const response = yield createResource(sheetType, sheetId, resourceType, body);
    yield put(createSheetResourceSuccess(sheetType, resourceType, response.data.data.doc));
  } catch (err) {
    yield put(createSheetResourceFailure(sheetType, err.response.data));
  }
}

// UPDATE SHEET RESOURCE
export function* onUpdateSheetResourceStart() {
  yield takeEvery(SheetActionTypes.UPDATE_SHEET_RESOURCE_START, updateSheetResource);
}

export function* updateSheetResource({ payload: { sheetType, sheetId, resourceType, resourceId, body } }) {
  try {
    const response = yield updateResource(sheetType, sheetId, resourceType, resourceId, body);
    yield put(updateSheetResourceSuccess(sheetType, resourceType, response.data.data.doc));
  } catch (err) {
    yield put(updateSheetResourceFailure(sheetType, err.response.data));
  }
}

// DELETE SHEET RESOURCE
export function* onDeleteSheetResourceStart() {
  yield takeLatest(SheetActionTypes.DELETE_SHEET_RESOURCE_START, deleteSheetResource);
}

export function* deleteSheetResource({ payload: { sheetType, sheetId, resourceType, resourceId } }) {
  try {
    const response = yield deleteResource(sheetType, sheetId, resourceType, resourceId);
    yield put(deleteSheetResourceSuccess(sheetType, resourceType, resourceId, response.data.data));
  } catch (err) {
    yield put(deleteSheetResourceFailure(sheetType, err.response.data));
  }
}

// EXPORT SHEET SAGAS
export function* sheetSagas() {
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
