import ResourceActionTypes from './resource.types';

// FETCH RESOURCE
export const fetchResourceStart = resourceType => ({
  type: ResourceActionTypes.FETCH_RESOURCE_START,
  payload: { resourceType },
});

export const fetchResourceSuccess = (resourceType, data) => ({
  type: ResourceActionTypes.FETCH_RESOURCE_SUCCESS,
  payload: { resourceType, data },
});

export const fetchResourceFailure = (resourceType, error) => ({
  type: ResourceActionTypes.FETCH_RESOURCE_FAILURE,
  payload: { resourceType, error },
});
