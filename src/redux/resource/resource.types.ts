import { ResourceType } from '../../models/enums';
import { AppError } from '../../models/interfaces/app';
import { Species, Weapon, AugmentationGroup, ConsumableCategory, CreatureType, NpcType } from '../../models/interfaces/data';

// Action Types
export enum ResourceActionTypes {
  FETCH_RESOURCE_START = 'FETCH_RESOURCE_START',
  FETCH_RESOURCE_SUCCESS = 'FETCH_RESOURCE_SUCCESS',
  FETCH_RESOURCE_FAILURE = 'FETCH_RESOURCE_FAILURE',
}

// Data Types
export type FetchResourceSuccessData = Species[] | Weapon[] | AugmentationGroup[] | ConsumableCategory[] | CreatureType[] | NpcType[];

// Interfaces
interface FetchResourceStartAction {
  type: ResourceActionTypes.FETCH_RESOURCE_START;
  payload: { resourceType: ResourceType };
}

interface FetchResourceSuccessAction {
  type: ResourceActionTypes.FETCH_RESOURCE_SUCCESS;
  payload: { resourceType: ResourceType; data: FetchResourceSuccessData };
}

interface FetchResourceFailureAction {
  type: ResourceActionTypes.FETCH_RESOURCE_FAILURE;
  payload: { resourceType: ResourceType; error: AppError };
}

// Export Interface Types
export type ResourceAction = FetchResourceStartAction | FetchResourceSuccessAction | FetchResourceFailureAction;
