import { FetchedResourceType } from '../../models/resource';
import { AppError } from '../../models/app';

import { ResourceActionTypes, FetchResourceSuccessData } from './resource.types';

// FETCH RESOURCE
export const fetchResourceStart = (resourceType: FetchedResourceType) => ({
  type: ResourceActionTypes.FETCH_RESOURCE_START,
  payload: { resourceType },
});

export const fetchResourceSuccess = (resourceType: FetchedResourceType, data: FetchResourceSuccessData) => ({
  type: ResourceActionTypes.FETCH_RESOURCE_SUCCESS,
  payload: { resourceType, data },
});

export const fetchResourceFailure = (resourceType: FetchedResourceType, error: AppError) => ({
  type: ResourceActionTypes.FETCH_RESOURCE_FAILURE,
  payload: { resourceType, error },
});
