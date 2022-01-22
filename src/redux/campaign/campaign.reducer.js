import SheetActionTypes from '../sheet/sheet.types';

import { replaceItemById, removeItemById } from '../../utils/arrays';

const INITIAL_STATE = {
  current: null,
  loading: false,
  error: null,
  permissions: undefined,
  reload: undefined,
};

const campaignReducer = (state = INITIAL_STATE, action) => {
  // Make sure the action is from the campaign sheet
  if (action.payload && action.payload.sheetType !== 'campaigns') {
    return state;
  }

  switch (action.type) {
    case SheetActionTypes.FETCH_CURRENT_SHEET_START:
      return {
        ...state,
        current: null,
        loading: true,
        error: null,
      };
    case SheetActionTypes.FETCH_CURRENT_SHEET_SUCCESS:
      return {
        ...state,
        current: action.payload.currentSheet,
        loading: false,
        error: null,
        reload: undefined,
      };
    case SheetActionTypes.UPDATE_SHEET_SUCCESS:
      return {
        ...state,
        current: {
          ...state.current,
          ...action.payload.updatedSheet,
        },
      };
    case SheetActionTypes.DELETE_SHEET_SUCCESS:
      return {
        current: null,
        error: null,
        permissions: undefined,
      };
    case SheetActionTypes.CREATE_SHEET_RESOURCE_SUCCESS:
      let { resourceType: createdResourceType, newResource } = action.payload;
      if (createdResourceType === 'logs') createdResourceType = 'captainsLogs';
      return {
        ...state,
        current: {
          ...state.current,
          [createdResourceType]: [newResource, ...state.current[createdResourceType]],
        },
      };
    case SheetActionTypes.UPDATE_SHEET_RESOURCE_SUCCESS:
      let { resourceType: updatedResourceType, updatedResource } = action.payload;
      if (updatedResourceType === 'logs') updatedResourceType = 'captainsLogs';
      return {
        ...state,
        current: {
          ...state.current,
          [updatedResourceType]: replaceItemById(state.current[updatedResourceType], updatedResource._id, updatedResource),
        },
      };
    case SheetActionTypes.DELETE_SHEET_RESOURCE_SUCCESS:
      let { resourceType: deletedResourceType, resourceId } = action.payload;
      if (deletedResourceType === 'logs') deletedResourceType = 'captainsLogs';
      return {
        ...state,
        current: {
          ...state.current,
          [deletedResourceType]: removeItemById(state.current[deletedResourceType], resourceId),
        },
      };
    case SheetActionTypes.ADD_CAMPAIGN_TO_CHARACTER_SUCCESS:
      return {
        ...state,
        reload: 'A new player has joined your campaign. Please refresh to get the latest data.',
      };
    case SheetActionTypes.REMOVE_CHARACTER_FROM_CAMPAIGN_SUCCESS:
      console.log(action.payload);
      return {
        ...state,
        current: {
          ...state.current,
          players: removeItemById(state.current.players, action.payload.data.metadata.charId),
        },
      };
    case SheetActionTypes.FETCH_CURRENT_SHEET_FAILURE:
      return {
        ...state,
        current: null,
        loading: false,
        error: action.payload.error,
      };
    case SheetActionTypes.UPDATE_SHEET_FAILURE:
    case SheetActionTypes.DELETE_SHEET_FAILURE:
    case SheetActionTypes.CREATE_SHEET_RESOURCE_FAILURE:
    case SheetActionTypes.UPDATE_SHEET_RESOURCE_FAILURE:
    case SheetActionTypes.DELETE_SHEET_RESOURCE_FAILURE:
    case SheetActionTypes.REMOVE_CHARACTER_FROM_CAMPAIGN_FAILURE:
      return {
        ...state,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export default campaignReducer;
