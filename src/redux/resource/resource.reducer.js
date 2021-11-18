import ResourceActionTypes from './resource.types';

const INITIAL_STATE = {
  species: null,
  weapons: null,
  augmentations: null,
  consumableCategories: null,
  creatureTypes: null,
  error: null,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ResourceActionTypes.FETCH_RESOURCE_SUCCESS:
      return {
        ...state,
        [action.payload.resourceType]: action.payload.data,
        error: null,
      };
    case ResourceActionTypes.FETCH_RESOURCE_FAILURE:
      return {
        ...state,
        [action.payload.resourceType]: null,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export default userReducer;
