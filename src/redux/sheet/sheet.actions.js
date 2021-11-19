import SheetActionTypes from './sheet.types';

// Fetch Sheet
export const fetchCurrentSheetStart = (sheetType, sheetId) => ({
  type: SheetActionTypes.FETCH_CURRENT_SHEET_START,
  payload: { sheetType, sheetId },
});

export const fetchCurrentSheetSuccess = currentSheet => ({
  type: SheetActionTypes.FETCH_CURRENT_SHEET_SUCCESS,
  payload: currentSheet,
});

export const fetchCurrentSheetFailure = error => ({
  type: SheetActionTypes.FETCH_CURRENT_SHEET_FAILURE,
  payload: error,
});

// Update Sheet
export const updateSheetStart = (sheetType, sheetId, body) => ({
  type: SheetActionTypes.UPDATE_SHEET_START,
  payload: { sheetType, sheetId, body },
});

export const updateSheetSuccess = updatedSheet => ({
  type: SheetActionTypes.UPDATE_SHEET_SUCCESS,
  payload: updatedSheet,
});

export const updateSheetFailure = error => ({
  type: SheetActionTypes.UPDATE_SHEET_FAILURE,
  payload: error,
});

// Delete Sheet
export const deleteSheetStart = (sheetType, sheetId) => ({
  type: SheetActionTypes.DELETE_SHEET_START,
  payload: { sheetType, sheetId },
});

export const deleteSheetSuccess = message => ({
  type: SheetActionTypes.DELETE_SHEET_SUCCESS,
  payload: message,
});

export const deleteSheetFailure = error => ({
  type: SheetActionTypes.DELETE_SHEET_FAILURE,
  payload: error,
});

// Get Sheet Resources
export const fetchSheetResourcesStart = (sheetType, sheetId, resourceType) => ({
  type: SheetActionTypes.FETCH_SHEET_RESOURCES_START,
  payload: { sheetType, sheetId, resourceType },
});

export const fetchSheetResourcesSuccess = fetchedResource => ({
  type: SheetActionTypes.FETCH_SHEET_RESOURCES_SUCCESS,
  payload: fetchedResource,
});

export const fetchSheetResourcesFailure = error => ({
  type: SheetActionTypes.FETCH_SHEET_RESOURCES_FAILURE,
  payload: error,
});

// Create Sheet Resource
export const createSheetResourceStart = (sheetType, sheetId, resourceType, body) => ({
  type: SheetActionTypes.CREATE_SHEET_RESOURCE_START,
  payload: { sheetType, sheetId, resourceType, body },
});

export const createSheetResourceSuccess = newResource => ({
  type: SheetActionTypes.CREATE_SHEET_RESOURCE_SUCCESS,
  payload: newResource,
});

export const createSheetResourceFailure = error => ({
  type: SheetActionTypes.CREATE_SHEET_RESOURCE_FAILURE,
  payload: error,
});

// Update Sheet Resource
export const updateSheetResourceStart = (sheetType, sheetId, resourceType, resourceId, body) => ({
  type: SheetActionTypes.UPDATE_SHEET_RESOURCE_START,
  payload: { sheetType, sheetId, resourceType, resourceId, body },
});

export const updateSheetResourceSuccess = updatedResource => ({
  type: SheetActionTypes.UPDATE_SHEET_RESOURCE_SUCCESS,
  payload: updatedResource,
});

export const updateSheetResourceFailure = error => ({
  type: SheetActionTypes.UPDATE_SHEET_RESOURCE_FAILURE,
  payload: error,
});

// Delete Sheet Resource
export const deleteSheetResourceStart = (sheetType, sheetId, resourceType, resourceId) => ({
  type: SheetActionTypes.DELETE_SHEET_RESOURCE_START,
  payload: { sheetType, sheetId, resourceType, resourceId },
});

export const deleteSheetResourceSuccess = message => ({
  type: SheetActionTypes.DELETE_SHEET_RESOURCE_SUCCESS,
  payload: message,
});

export const deleteSheetResourceFailure = error => ({
  type: SheetActionTypes.DELETE_SHEET_RESOURCE_FAILURE,
  payload: error,
});
