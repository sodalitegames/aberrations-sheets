import { takeLatest, put, all, call } from 'redux-saga/effects';

import ResourceActionTypes from './resource.types';

import { fetchResourceSuccess, fetchResourceFailure } from './resource.actions';

import { fetchSpecies, fetchWeapons, fetchAugmentations, fetchConsumableCategories, fetchCreatureTypes } from '../../apis/aberrations.api';

export function* onFetchResourceStart() {
  yield takeLatest(ResourceActionTypes.FETCH_RESOURCE_START, fetchResource);
}

export function* fetchResource({ payload: { resourceType } }) {
  try {
    let response;

    switch (resourceType) {
      case 'species':
        response = yield fetchSpecies();
        yield put(fetchResourceSuccess(resourceType, response.data));
        break;
      case 'weapons':
        response = yield fetchWeapons();
        yield put(fetchResourceSuccess(resourceType, response.data));
        break;
      case 'augmentations':
        response = yield fetchAugmentations();
        yield put(fetchResourceSuccess(resourceType, response.data));
        break;
      case 'consumableCategories':
        response = yield fetchConsumableCategories();
        yield put(fetchResourceSuccess(resourceType, response.data));
        break;
      case 'creatureTypes':
        response = yield fetchCreatureTypes();
        yield put(fetchResourceSuccess(resourceType, response.data));
        break;
      default:
        break;
    }
  } catch (error) {
    yield put(fetchResourceFailure(resourceType, error.response.data));
  }
}

// EXPORT RESOURCE SAGAS
export function* resourceSagas() {
  yield all([call(onFetchResourceStart)]);
}
