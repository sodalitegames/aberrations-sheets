import { SheetActionTypes } from './sheet.types';

import { AppError } from '../../models/app';

import { Sheet, SheetResource, SheetType, SheetPermissions, SheetConfig, SheetResourceType, Campaign } from '../../models/sheet';
import { Player } from '../../models/sheet/resources';

// Fetch Sheet
export const fetchCurrentSheetStart = (sheetType: SheetType, sheetId: string) => ({
  type: SheetActionTypes.FETCH_CURRENT_SHEET_START,
  payload: { sheetType, sheetId },
});

export const fetchCurrentSheetSuccess = (sheetType: SheetType, currentSheet: Sheet, permissions?: SheetPermissions) => ({
  type: SheetActionTypes.FETCH_CURRENT_SHEET_SUCCESS,
  payload: { sheetType, currentSheet, permissions },
});

export const fetchCurrentSheetFailure = (sheetType: SheetType, error: AppError) => ({
  type: SheetActionTypes.FETCH_CURRENT_SHEET_FAILURE,
  payload: { sheetType, error },
});

// Update Sheet
export const updateSheetStart = (sheetType: SheetType, sheetId: string, body: any, config: SheetConfig) => ({
  type: SheetActionTypes.UPDATE_SHEET_START,
  payload: { sheetType, sheetId, body, config },
});

export const updateSheetSuccess = (sheetType: SheetType, updatedSheet: Sheet) => ({
  type: SheetActionTypes.UPDATE_SHEET_SUCCESS,
  payload: { sheetType, updatedSheet },
});

export const updateSheetFailure = (sheetType: SheetType, error: AppError) => ({
  type: SheetActionTypes.UPDATE_SHEET_FAILURE,
  payload: { sheetType, error },
});

// Delete Sheet
export const deleteSheetStart = (sheetType: SheetType, sheetId: string, config: SheetConfig) => ({
  type: SheetActionTypes.DELETE_SHEET_START,
  payload: { sheetType, sheetId, config },
});

export const deleteSheetSuccess = (sheetType: SheetType, sheetId: string, message: any) => ({
  type: SheetActionTypes.DELETE_SHEET_SUCCESS,
  payload: { sheetType, sheetId, message },
});

export const deleteSheetFailure = (sheetType: SheetType, error: AppError) => ({
  type: SheetActionTypes.DELETE_SHEET_FAILURE,
  payload: { sheetType, error },
});

// Get Sheet Resources
export const fetchSheetResourcesStart = (sheetType: SheetType, sheetId: string, resourceType: SheetResourceType) => ({
  type: SheetActionTypes.FETCH_SHEET_RESOURCES_START,
  payload: { sheetType, sheetId, resourceType },
});

export const fetchSheetResourcesSuccess = (sheetType: SheetType, fetchedResource: SheetResource) => ({
  type: SheetActionTypes.FETCH_SHEET_RESOURCES_SUCCESS,
  payload: { sheetType, fetchedResource },
});

export const fetchSheetResourcesFailure = (sheetType: SheetType, error: AppError) => ({
  type: SheetActionTypes.FETCH_SHEET_RESOURCES_FAILURE,
  payload: { sheetType, error },
});

// Create Sheet Resource
export const createSheetResourceStart = (sheetType: SheetType, sheetId: string, resourceType: SheetResourceType, body: any, config: SheetConfig) => ({
  type: SheetActionTypes.CREATE_SHEET_RESOURCE_START,
  payload: { sheetType, sheetId, resourceType, body, config },
});

export const createSheetResourceSuccess = (sheetType: SheetType, resourceType: SheetResourceType, newResource: SheetResource) => ({
  type: SheetActionTypes.CREATE_SHEET_RESOURCE_SUCCESS,
  payload: { sheetType, resourceType, newResource },
});

export const createSheetResourceFailure = (sheetType: SheetType, error: AppError) => ({
  type: SheetActionTypes.CREATE_SHEET_RESOURCE_FAILURE,
  payload: { sheetType, error },
});

// Update Sheet Resource
export const updateSheetResourceStart = (sheetType: SheetType, sheetId: string, resourceType: SheetResourceType, resourceId: string, body: any, config: SheetConfig) => ({
  type: SheetActionTypes.UPDATE_SHEET_RESOURCE_START,
  payload: { sheetType, sheetId, resourceType, resourceId, body, config },
});

export const updateSheetResourceSuccess = (sheetType: SheetType, resourceType: SheetResourceType, updatedResource: SheetResource) => ({
  type: SheetActionTypes.UPDATE_SHEET_RESOURCE_SUCCESS,
  payload: { sheetType, resourceType, updatedResource },
});

export const updateSheetResourceFailure = (sheetType: SheetType, error: AppError) => ({
  type: SheetActionTypes.UPDATE_SHEET_RESOURCE_FAILURE,
  payload: { sheetType, error },
});

// Delete Sheet Resource
export const deleteSheetResourceStart = (sheetType: SheetType, sheetId: string, resourceType: SheetResourceType, resourceId: string, config: SheetConfig) => ({
  type: SheetActionTypes.DELETE_SHEET_RESOURCE_START,
  payload: { sheetType, sheetId, resourceType, resourceId, config },
});

export const deleteSheetResourceSuccess = (sheetType: SheetType, resourceType: SheetResourceType, resourceId: string, message: any) => ({
  type: SheetActionTypes.DELETE_SHEET_RESOURCE_SUCCESS,
  payload: { sheetType, resourceType, resourceId, message },
});

export const deleteSheetResourceFailure = (sheetType: SheetType, error: AppError) => ({
  type: SheetActionTypes.DELETE_SHEET_RESOURCE_FAILURE,
  payload: { sheetType, error },
});

// Add Campaign to Character
export const addCampaignToCharacterSuccess = (sheetType: SheetType, campaign: Campaign) => ({
  type: SheetActionTypes.ADD_CAMPAIGN_TO_CHARACTER_SUCCESS,
  payload: { sheetType, campaign },
});

// Remove Character from Campaign
export const removeCharacterFromCampaignStart = (sheetType: SheetType, sheetId: string, body: any, config: SheetConfig) => ({
  type: SheetActionTypes.REMOVE_CHARACTER_FROM_CAMPAIGN_START,
  payload: { sheetType, sheetId, body, config },
});

export const removeCharacterFromCampaignSuccess = (sheetType: SheetType, data: any) => ({
  type: SheetActionTypes.REMOVE_CHARACTER_FROM_CAMPAIGN_SUCCESS,
  payload: { sheetType, data },
});

export const removeCharacterFromCampaignFailure = (sheetType: SheetType, error: AppError) => ({
  type: SheetActionTypes.REMOVE_CHARACTER_FROM_CAMPAIGN_FAILURE,
  payload: { sheetType, error },
});

// Update Player and Player Resources
export const updatePlayerSuccess = (sheetType: SheetType, updatedPlayer: Player) => ({
  type: SheetActionTypes.UPDATE_PLAYER_SUCCESS,
  payload: { sheetType, updatedPlayer },
});

export const createPlayerResourceSuccess = (sheetType: SheetType, playerId: string, resourceType: SheetResourceType, newResource: SheetResource) => ({
  type: SheetActionTypes.CREATE_PLAYER_RESOURCE_SUCCESS,
  payload: { sheetType, playerId, resourceType, newResource },
});

export const updatePlayerResourceSuccess = (sheetType: SheetType, playerId: string, resourceType: SheetResourceType, updatedResource: SheetResource) => ({
  type: SheetActionTypes.UPDATE_PLAYER_RESOURCE_SUCCESS,
  payload: { sheetType, playerId, resourceType, updatedResource },
});

export const deletePlayerResourceSuccess = (sheetType: SheetType, playerId: string, resourceType: SheetResourceType, resourceId: string, message: any) => ({
  type: SheetActionTypes.DELETE_PLAYER_RESOURCE_SUCCESS,
  payload: { sheetType, playerId, resourceType, resourceId, message },
});
