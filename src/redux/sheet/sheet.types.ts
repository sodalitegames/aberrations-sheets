import { AppError } from '../../models/app';
import { Player } from '../../models/sheet/resources';
import { Sheet, SheetResource, SheetConfig, SheetPermissions, SheetResourceType, SheetType, Campaign } from '../../models/sheet';

// Action Types
export enum SheetActionTypes {
  FETCH_CURRENT_SHEET_START = 'FETCH_CURRENT_SHEET_START',
  FETCH_CURRENT_SHEET_SUCCESS = 'FETCH_CURRENT_SHEET_SUCCESS',
  FETCH_CURRENT_SHEET_FAILURE = 'FETCH_CURRENT_SHEET_FAILURE',

  UPDATE_SHEET_START = 'UPDATE_SHEET_START',
  UPDATE_SHEET_SUCCESS = 'UPDATE_SHEET_SUCCESS',
  UPDATE_SHEET_FAILURE = 'UPDATE_SHEET_FAILURE',

  DELETE_SHEET_START = 'DELETE_SHEET_START',
  DELETE_SHEET_SUCCESS = 'DELETE_SHEET_SUCCESS',
  DELETE_SHEET_FAILURE = 'DELETE_SHEET_FAILURE',

  FETCH_SHEET_RESOURCES_START = 'FETCH_SHEET_RESOURCES_START',
  FETCH_SHEET_RESOURCES_SUCCESS = 'FETCH_SHEET_RESOURCES_SUCCESS',
  FETCH_SHEET_RESOURCES_FAILURE = 'FETCH_SHEET_RESOURCES_FAILURE',

  CREATE_SHEET_RESOURCE_START = 'CREATE_SHEET_RESOURCE_START',
  CREATE_SHEET_RESOURCE_SUCCESS = 'CREATE_SHEET_RESOURCE_SUCCESS',
  CREATE_SHEET_RESOURCE_FAILURE = 'CREATE_SHEET_RESOURCE_FAILURE',

  UPDATE_SHEET_RESOURCE_START = 'UPDATE_SHEET_RESOURCE_START',
  UPDATE_SHEET_RESOURCE_SUCCESS = 'UPDATE_SHEET_RESOURCE_SUCCESS',
  UPDATE_SHEET_RESOURCE_FAILURE = 'UPDATE_SHEET_RESOURCE_FAILURE',

  DELETE_SHEET_RESOURCE_START = 'DELETE_SHEET_RESOURCE_START',
  DELETE_SHEET_RESOURCE_SUCCESS = 'DELETE_SHEET_RESOURCE_SUCCESS',
  DELETE_SHEET_RESOURCE_FAILURE = 'DELETE_SHEET_RESOURCE_FAILURE',

  ADD_CAMPAIGN_TO_CHARACTER_SUCCESS = 'ADD_CAMPAIGN_TO_CHARACTER_SUCCESS',

  REMOVE_CHARACTER_FROM_CAMPAIGN_START = 'REMOVE_CHARACTER_FROM_CAMPAIGN_START',
  REMOVE_CHARACTER_FROM_CAMPAIGN_SUCCESS = 'REMOVE_CHARACTER_FROM_CAMPAIGN_SUCCESS',
  REMOVE_CHARACTER_FROM_CAMPAIGN_FAILURE = 'REMOVE_CHARACTER_FROM_CAMPAIGN_FAILURE',

  UPDATE_PLAYER_SUCCESS = 'UPDATE_PLAYER_SUCCESS',
  CREATE_PLAYER_RESOURCE_SUCCESS = 'CREATE_PLAYER_RESOURCE_SUCCESS',
  UPDATE_PLAYER_RESOURCE_SUCCESS = 'UPDATE_PLAYER_RESOURCE_SUCCESS',
  DELETE_PLAYER_RESOURCE_SUCCESS = 'DELETE_PLAYER_RESOURCE_SUCCESS',
}

// Interfaces
export interface FetchCurrentSheetStartAction {
  type: SheetActionTypes.FETCH_CURRENT_SHEET_START;
  payload: { sheetType: SheetType; sheetId: string };
}

interface FetchCurrentSheetSuccessAction {
  type: SheetActionTypes.FETCH_CURRENT_SHEET_SUCCESS;
  payload: { sheetType: SheetType; currentSheet: Sheet; permissions: SheetPermissions };
}

interface FetchCurrentSheetFailureAction {
  type: SheetActionTypes.FETCH_CURRENT_SHEET_FAILURE;
  payload: { sheetType: SheetType; error: AppError };
}

export interface UpdateSheetStartAction {
  type: SheetActionTypes.UPDATE_SHEET_START;
  payload: { sheetType: SheetType; sheetId: string; body: any; config: SheetConfig };
}

interface UpdateSheetSuccessAction {
  type: SheetActionTypes.UPDATE_SHEET_SUCCESS;
  payload: { sheetType: SheetType; updatedSheet: Sheet };
}

interface UpdateSheetFailureAction {
  type: SheetActionTypes.UPDATE_SHEET_FAILURE;
  payload: { sheetType: SheetType; error: AppError };
}

export interface DeleteSheetStartAction {
  type: SheetActionTypes.DELETE_SHEET_START;
  payload: { sheetType: SheetType; sheetId: string; config: SheetConfig };
}

interface DeleteSheetSuccessAction {
  type: SheetActionTypes.DELETE_SHEET_SUCCESS;
  payload: { sheetType: SheetType; sheetId: string; message: any };
}

interface DeleteSheetFailureAction {
  type: SheetActionTypes.DELETE_SHEET_FAILURE;
  payload: { sheetType: SheetType; error: AppError };
}

export interface FetchSheetResourcesStartAction {
  type: SheetActionTypes.FETCH_SHEET_RESOURCES_START;
  payload: { sheetType: SheetType; sheetId: string; resourceType: SheetResourceType };
}

interface FetchSheetResourcesSuccessAction {
  type: SheetActionTypes.FETCH_SHEET_RESOURCES_SUCCESS;
  payload: { sheetType: SheetType; fetchedResource: SheetResource };
}

interface FetchSheetResourcesFailureAction {
  type: SheetActionTypes.FETCH_SHEET_RESOURCES_FAILURE;
  payload: { sheetType: SheetType; error: AppError };
}

export interface CreateSheetResourceStartAction {
  type: SheetActionTypes.CREATE_SHEET_RESOURCE_START;
  payload: { sheetType: SheetType; sheetId: string; resourceType: SheetResourceType; body: any; config: SheetConfig };
}

interface CreateSheetResourceSuccessAction {
  type: SheetActionTypes.CREATE_SHEET_RESOURCE_SUCCESS;
  payload: { sheetType: SheetType; resourceType: SheetResourceType; newResource: SheetResource };
}

interface CreateSheetResourceFailureAction {
  type: SheetActionTypes.CREATE_SHEET_RESOURCE_FAILURE;
  payload: { sheetType: SheetType; error: AppError };
}

export interface UpdateSheetResourceStartAction {
  type: SheetActionTypes.UPDATE_SHEET_RESOURCE_START;
  payload: { sheetType: SheetType; sheetId: string; resourceType: SheetResourceType; resourceId: string; body: any; config: SheetConfig };
}

interface UpdateSheetResourceSuccessAction {
  type: SheetActionTypes.UPDATE_SHEET_RESOURCE_SUCCESS;
  payload: { sheetType: SheetType; resourceType: SheetResourceType; updatedResource: SheetResource };
}

interface UpdateSheetResourceFailureAction {
  type: SheetActionTypes.UPDATE_SHEET_RESOURCE_FAILURE;
  payload: { sheetType: SheetType; error: AppError };
}

export interface DeleteSheetResourceStartAction {
  type: SheetActionTypes.DELETE_SHEET_RESOURCE_START;
  payload: { sheetType: SheetType; sheetId: string; resourceType: SheetResourceType; resourceId: string; config: SheetConfig };
}

interface DeleteSheetResourceSuccessAction {
  type: SheetActionTypes.DELETE_SHEET_RESOURCE_SUCCESS;
  payload: { sheetType: SheetType; resourceType: SheetResourceType; resourceId: string; message: any };
}

interface DeleteSheetResourceFailureAction {
  type: SheetActionTypes.DELETE_SHEET_RESOURCE_FAILURE;
  payload: { sheetType: SheetType; error: AppError };
}

interface AddCampaignToCharacterSuccessAction {
  type: SheetActionTypes.ADD_CAMPAIGN_TO_CHARACTER_SUCCESS;
  payload: { sheetType: SheetType; campaign: Campaign };
}

export interface RemoveCharacterFromCampaignStartAction {
  type: SheetActionTypes.REMOVE_CHARACTER_FROM_CAMPAIGN_START;
  payload: { sheetType: SheetType; sheetId: string; body: any; config: SheetConfig };
}

interface RemoveCharacterFromCampaignSuccessAction {
  type: SheetActionTypes.REMOVE_CHARACTER_FROM_CAMPAIGN_SUCCESS;
  payload: { sheetType: SheetType; data: any };
}

interface RemoveCharacterFromCampaignFailureAction {
  type: SheetActionTypes.REMOVE_CHARACTER_FROM_CAMPAIGN_FAILURE;
  payload: { sheetType: SheetType; error: AppError };
}

interface UpdatePlayerSuccessAction {
  type: SheetActionTypes.UPDATE_PLAYER_SUCCESS;
  payload: { sheetType: SheetType; updatedPlayer: Player };
}

interface CreatePlayerResourceSuccessAction {
  type: SheetActionTypes.CREATE_PLAYER_RESOURCE_SUCCESS;
  payload: { sheetType: SheetType; playerId: string; resourceType: SheetResourceType; newResource: SheetResource };
}

interface UpdatePlayerResourceSuccessAction {
  type: SheetActionTypes.UPDATE_PLAYER_RESOURCE_SUCCESS;
  payload: { sheetType: SheetType; playerId: string; resourceType: SheetResourceType; updatedResource: SheetResource };
}

interface DeletePlayerResourceSuccessAction {
  type: SheetActionTypes.DELETE_PLAYER_RESOURCE_SUCCESS;
  payload: { sheetType: SheetType; playerId: string; resourceType: SheetResourceType; resourceId: string; message: any };
}

// Export Interface Types
export type SheetAction =
  | FetchCurrentSheetStartAction
  | FetchCurrentSheetSuccessAction
  | FetchCurrentSheetFailureAction
  | UpdateSheetStartAction
  | UpdateSheetSuccessAction
  | UpdateSheetFailureAction
  | DeleteSheetStartAction
  | DeleteSheetSuccessAction
  | DeleteSheetFailureAction
  | FetchSheetResourcesStartAction
  | FetchSheetResourcesSuccessAction
  | FetchSheetResourcesFailureAction
  | CreateSheetResourceStartAction
  | CreateSheetResourceSuccessAction
  | CreateSheetResourceFailureAction
  | UpdateSheetResourceStartAction
  | UpdateSheetResourceSuccessAction
  | UpdateSheetResourceFailureAction
  | DeleteSheetResourceStartAction
  | DeleteSheetResourceSuccessAction
  | DeleteSheetResourceFailureAction
  | AddCampaignToCharacterSuccessAction
  | RemoveCharacterFromCampaignStartAction
  | RemoveCharacterFromCampaignSuccessAction
  | RemoveCharacterFromCampaignFailureAction
  | UpdatePlayerSuccessAction
  | CreatePlayerResourceSuccessAction
  | UpdatePlayerResourceSuccessAction
  | DeletePlayerResourceSuccessAction;
