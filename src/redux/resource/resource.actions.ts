import { ResourceType } from '../../models/enums';
import { AppError } from '../../models/interfaces/app';

import { ResourceActionTypes, FetchResourceSuccessData } from './resource.types';

// FETCH RESOURCE
export const fetchResourceStart = (resourceType: ResourceType) => ({
  type: ResourceActionTypes.FETCH_RESOURCE_START,
  payload: { resourceType },
});

export const fetchResourceSuccess = (resourceType: ResourceType, data: FetchResourceSuccessData) => ({
  type: ResourceActionTypes.FETCH_RESOURCE_SUCCESS,
  payload: { resourceType, data },
});

export const fetchResourceFailure = (resourceType: ResourceType, error: AppError) => ({
  type: ResourceActionTypes.FETCH_RESOURCE_FAILURE,
  payload: { resourceType, error },
});
