import { AppError } from '../../models/interfaces/app';
import { Species, Weapon, AugmentationGroup, ConsumableCategory, CreatureType, NpcType } from '../../models/interfaces/data';

import { ResourceActionTypes, ResourceAction } from './resource.types';

export interface ResourceState {
  species: Species[] | null;
  weapons: Weapon[] | null;
  augmentationGroups: AugmentationGroup[] | null;
  consumableCategories: ConsumableCategory[] | null;
  creatureTypes: CreatureType[] | null;
  npcTypes: NpcType[] | null;
  error: AppError | null;
}

const INITIAL_STATE = {
  species: null,
  weapons: null,
  augmentationGroups: null,
  consumableCategories: null,
  creatureTypes: null,
  npcTypes: null,
  error: null,
};

const resourceReducer = (state: ResourceState = INITIAL_STATE, action: ResourceAction): ResourceState => {
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

export default resourceReducer;
