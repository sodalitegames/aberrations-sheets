import { takeLatest, put, all, call } from 'redux-saga/effects';

import { fetchResourceSuccess, fetchResourceFailure } from './resource.actions';

import { AppError } from '../../models/app';
import { FetchedResourceType, Species, Weapon, AugmentationGroup, ConsumableCategory, CreatureType, NpcType } from '../../models/resource';

import { FetchResourceStartAction, ResourceActionTypes } from './resource.types';

import { fetchSpecies, fetchWeapons, fetchAugmentationGroups, fetchConsumableCategories, fetchCreatureTypes, fetchNpcTypes } from '../../apis/database.api';

export function* onFetchResourceStart() {
  yield takeLatest(ResourceActionTypes.FETCH_RESOURCE_START, fetchResource);
}

export function* fetchResource({ payload: { resourceType } }: FetchResourceStartAction) {
  try {
    switch (resourceType) {
      case FetchedResourceType.Species:
        const {
          data: { docs: species },
        } = yield fetchSpecies();
        yield put(fetchResourceSuccess(resourceType, species as Species[]));
        break;
      case FetchedResourceType.Weapons:
        const {
          data: { docs: weapons },
        } = yield fetchWeapons();
        yield put(fetchResourceSuccess(resourceType, weapons as Weapon[]));
        break;
      case FetchedResourceType.AugmentationGroups:
        const {
          data: { docs: augmentationGroups },
        } = yield fetchAugmentationGroups();
        yield put(fetchResourceSuccess(resourceType, augmentationGroups as AugmentationGroup[]));
        break;
      case FetchedResourceType.ConsumableCategories:
        const {
          data: { docs: consumableCategories },
        } = yield fetchConsumableCategories();
        yield put(fetchResourceSuccess(resourceType, consumableCategories as ConsumableCategory[]));
        break;
      case FetchedResourceType.CreatureTypes:
        const {
          data: { docs: creatureTypes },
        } = yield fetchCreatureTypes();
        yield put(fetchResourceSuccess(resourceType, creatureTypes as CreatureType[]));
        break;
      case FetchedResourceType.NpcTypes:
        const {
          data: { docs: npcTypes },
        } = yield fetchNpcTypes();
        yield put(fetchResourceSuccess(resourceType, npcTypes as NpcType[]));
        break;
      default:
        break;
    }
  } catch (err: any) {
    const error: AppError = { status: 'error', message: err.message || 'An error occured fetching resource data.', data: err.response || err.request || undefined };
    yield put(fetchResourceFailure(resourceType, error));
  }
}

// EXPORT RESOURCE SAGAS
export function* resourceSagas() {
  yield all([call(onFetchResourceStart)]);
}
