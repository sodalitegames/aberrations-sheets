import { AppError } from '../../models/app';
import { FetchedResourceType, Species, Weapon, AugmentationGroup, ConsumableCategory, CreatureType, NpcType } from '../../models/resource';

// Action Types
export enum ResourceActionTypes {
  FETCH_RESOURCE_START = 'FETCH_RESOURCE_START',
  FETCH_RESOURCE_SUCCESS = 'FETCH_RESOURCE_SUCCESS',
  FETCH_RESOURCE_FAILURE = 'FETCH_RESOURCE_FAILURE',
}

// Data Types
export type FetchResourceSuccessData = Species[] | Weapon[] | AugmentationGroup[] | ConsumableCategory[] | CreatureType[] | NpcType[];

// Interfaces
export interface FetchResourceStartAction {
  type: ResourceActionTypes.FETCH_RESOURCE_START;
  payload: { resourceType: FetchedResourceType };
}

interface FetchResourceSuccessAction {
  type: ResourceActionTypes.FETCH_RESOURCE_SUCCESS;
  payload: { resourceType: FetchedResourceType; data: FetchResourceSuccessData };
}

interface FetchResourceFailureAction {
  type: ResourceActionTypes.FETCH_RESOURCE_FAILURE;
  payload: { resourceType: FetchedResourceType; error: AppError };
}

// Export Interface Types
export type ResourceAction = FetchResourceStartAction | FetchResourceSuccessAction | FetchResourceFailureAction;
