import { takeLatest, put, all, call } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';

import { fetchResourceSuccess, fetchResourceFailure } from './resource.actions';

import { ResourceType } from '../../models/enums';
import { AppError } from '../../models/app';
import { Species, Weapon, AugmentationGroup, ConsumableCategory, CreatureType, NpcType } from '../../models/resource';

import { FetchResourceStartAction, ResourceActionTypes } from './resource.types';

import { fetchSpecies, fetchWeapons, fetchAugmentationGroups, fetchConsumableCategories, fetchCreatureTypes, fetchNpcTypes } from '../../apis/aberrations.api';

export function* onFetchResourceStart() {
  yield takeLatest(ResourceActionTypes.FETCH_RESOURCE_START, fetchResource);
}

export function* fetchResource({ payload: { resourceType } }: FetchResourceStartAction) {
  try {
    switch (resourceType) {
      case ResourceType.Species:
        const { data: species }: AxiosResponse<Species[]> = yield fetchSpecies();
        yield put(fetchResourceSuccess(resourceType, species));
        break;
      case ResourceType.Weapons:
        const { data: weapons }: AxiosResponse<Weapon[]> = yield fetchWeapons();
        yield put(fetchResourceSuccess(resourceType, weapons));
        break;
      case ResourceType.AugmentationGroups:
        const { data: augmentationGroups }: AxiosResponse<AugmentationGroup[]> = yield fetchAugmentationGroups();
        yield put(fetchResourceSuccess(resourceType, augmentationGroups));
        break;
      case ResourceType.ConsumableCategories:
        const { data: consumableCategories }: AxiosResponse<ConsumableCategory[]> = yield fetchConsumableCategories();
        yield put(fetchResourceSuccess(resourceType, consumableCategories));
        break;
      case ResourceType.CreatureTypes:
        const { data: creatureTypes }: AxiosResponse<CreatureType[]> = yield fetchCreatureTypes();
        yield put(fetchResourceSuccess(resourceType, creatureTypes));
        break;
      case ResourceType.NpcTypes:
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
