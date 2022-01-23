import SheetActionTypes from './sheet.types';

// Fetch Sheet
export const fetchCurrentSheetStart = (sheetType, sheetId) => ({
  type: SheetActionTypes.FETCH_CURRENT_SHEET_START,
  payload: { sheetType, sheetId },
});

export const fetchCurrentSheetSuccess = (sheetType, currentSheet, permissions) => ({
  type: SheetActionTypes.FETCH_CURRENT_SHEET_SUCCESS,
  payload: { sheetType, currentSheet, permissions },
});

export const fetchCurrentSheetFailure = (sheetType, error) => ({
  type: SheetActionTypes.FETCH_CURRENT_SHEET_FAILURE,
  payload: { sheetType, error },
});

// Update Sheet
export const updateSheetStart = (sheetType, sheetId, body, config) => ({
  type: SheetActionTypes.UPDATE_SHEET_START,
  payload: { sheetType, sheetId, body, config },
});

export const updateSheetSuccess = (sheetType, updatedSheet) => ({
  type: SheetActionTypes.UPDATE_SHEET_SUCCESS,
  payload: { sheetType, updatedSheet },
});

export const updateSheetFailure = (sheetType, error) => ({
  type: SheetActionTypes.UPDATE_SHEET_FAILURE,
  payload: { sheetType, error },
});

// Delete Sheet
export const deleteSheetStart = (sheetType, sheetId, config) => ({
  type: SheetActionTypes.DELETE_SHEET_START,
  payload: { sheetType, sheetId, config },
});

export const deleteSheetSuccess = (sheetType, sheetId, message) => ({
  type: SheetActionTypes.DELETE_SHEET_SUCCESS,
  payload: { sheetType, sheetId, message },
});

export const deleteSheetFailure = (sheetType, error) => ({
  type: SheetActionTypes.DELETE_SHEET_FAILURE,
  payload: { sheetType, error },
});

// Get Sheet Resources
export const fetchSheetResourcesStart = (sheetType, sheetId, resourceType) => ({
  type: SheetActionTypes.FETCH_SHEET_RESOURCES_START,
  payload: { sheetType, sheetId, resourceType },
});

export const fetchSheetResourcesSuccess = (sheetType, fetchedResource) => ({
  type: SheetActionTypes.FETCH_SHEET_RESOURCES_SUCCESS,
  payload: { sheetType, fetchedResource },
});

export const fetchSheetResourcesFailure = (sheetType, error) => ({
  type: SheetActionTypes.FETCH_SHEET_RESOURCES_FAILURE,
  payload: { sheetType, error },
});

// Create Sheet Resource
export const createSheetResourceStart = (sheetType, sheetId, resourceType, body, config) => ({
  type: SheetActionTypes.CREATE_SHEET_RESOURCE_START,
  payload: { sheetType, sheetId, resourceType, body, config },
});

export const createSheetResourceSuccess = (sheetType, resourceType, newResource) => ({
  type: SheetActionTypes.CREATE_SHEET_RESOURCE_SUCCESS,
  payload: { sheetType, resourceType, newResource },
});

export const createSheetResourceFailure = (sheetType, error) => ({
  type: SheetActionTypes.CREATE_SHEET_RESOURCE_FAILURE,
  payload: { sheetType, error },
});

// Update Sheet Resource
export const updateSheetResourceStart = (sheetType, sheetId, resourceType, resourceId, body, config) => ({
  type: SheetActionTypes.UPDATE_SHEET_RESOURCE_START,
  payload: { sheetType, sheetId, resourceType, resourceId, body, config },
});

export const updateSheetResourceSuccess = (sheetType, resourceType, updatedResource) => ({
  type: SheetActionTypes.UPDATE_SHEET_RESOURCE_SUCCESS,
  payload: { sheetType, resourceType, updatedResource },
});

export const updateSheetResourceFailure = (sheetType, error) => ({
  type: SheetActionTypes.UPDATE_SHEET_RESOURCE_FAILURE,
  payload: { sheetType, error },
});

// Delete Sheet Resource
export const deleteSheetResourceStart = (sheetType, sheetId, resourceType, resourceId, config) => ({
  type: SheetActionTypes.DELETE_SHEET_RESOURCE_START,
  payload: { sheetType, sheetId, resourceType, resourceId, config },
});

export const deleteSheetResourceSuccess = (sheetType, resourceType, resourceId, message) => ({
  type: SheetActionTypes.DELETE_SHEET_RESOURCE_SUCCESS,
  payload: { sheetType, resourceType, resourceId, message },
});

export const deleteSheetResourceFailure = (sheetType, error) => ({
  type: SheetActionTypes.DELETE_SHEET_RESOURCE_FAILURE,
  payload: { sheetType, error },
});

// Add Campaign to Character
export const addCampaignToCharacterSuccess = (sheetType, campaign) => ({
  type: SheetActionTypes.ADD_CAMPAIGN_TO_CHARACTER_SUCCESS,
  payload: { sheetType, campaign },
});

// Remove Character from Campaign
export const removeCharacterFromCampaignStart = (sheetType, sheetId, body, config) => ({
  type: SheetActionTypes.REMOVE_CHARACTER_FROM_CAMPAIGN_START,
  payload: { sheetType, sheetId, body, config },
});

export const removeCharacterFromCampaignSuccess = (sheetType, data) => ({
  type: SheetActionTypes.REMOVE_CHARACTER_FROM_CAMPAIGN_SUCCESS,
  payload: { sheetType, data },
});

export const removeCharacterFromCampaignFailure = (sheetType, error) => ({
  type: SheetActionTypes.REMOVE_CHARACTER_FROM_CAMPAIGN_FAILURE,
  payload: { sheetType, error },
});
