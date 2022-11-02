import { takeLatest, put, all, call } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';

import { fetchResourceSuccess, fetchResourceFailure } from './resource.actions';

import { AppError } from '../../models/app';
import { FetchedResourceType, Species, Weapon, AugmentationGroup, ConsumableCategory, CreatureType, NpcType } from '../../models/resource';

import { FetchResourceStartAction, ResourceActionTypes } from './resource.types';

import { fetchSpecies, fetchWeapons, fetchAugmentationGroups, fetchConsumableCategories, fetchCreatureTypes, fetchNpcTypes } from '../../apis/aberrations.api';

export function* onFetchResourceStart() {
  yield takeLatest(ResourceActionTypes.FETCH_RESOURCE_START, fetchResource);
}

export function* fetchResource({ payload: { resourceType } }: FetchResourceStartAction) {
  try {
    switch (resourceType) {
      case FetchedResourceType.Species:
        const { data: species }: AxiosResponse<Species[]> = yield fetchSpecies();
        yield put(fetchResourceSuccess(resourceType, species));
        break;
      case FetchedResourceType.Weapons:
        const { data: weapons }: AxiosResponse<Weapon[]> = yield fetchWeapons();
        yield put(fetchResourceSuccess(resourceType, weapons));
        break;
      case FetchedResourceType.AugmentationGroups:
        const { data: augmentationGroups }: AxiosResponse<AugmentationGroup[]> = yield fetchAugmentationGroups();
        yield put(fetchResourceSuccess(resourceType, augmentationGroups));
        break;
      case FetchedResourceType.ConsumableCategories:
        const { data: consumableCategories }: AxiosResponse<ConsumableCategory[]> = yield fetchConsumableCategories();
        yield put(fetchResourceSuccess(resourceType, consumableCategories));
        break;
      case FetchedResourceType.CreatureTypes:
        const { data: creatureTypes }: AxiosResponse<CreatureType[]> = yield fetchCreatureTypes();
        yield put(fetchResourceSuccess(resourceType, creatureTypes));
        break;
      case FetchedResourceType.NpcTypes:
        const { data: npcTypes }: AxiosResponse<NpcType[]> = yield fetchNpcTypes();
        yield put(fetchResourceSuccess(resourceType, npcTypes));
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
