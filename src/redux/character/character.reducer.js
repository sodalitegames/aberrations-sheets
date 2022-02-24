import SheetActionTypes from '../sheet/sheet.types';
import { AppActionTypes } from '../app/app.types';

import { replaceItemById, removeItemById } from '../../utils/helpers/arrays';

const INITIAL_STATE = {
  current: null,
  loading: false,
  error: null,
  permissions: undefined,
  reload: undefined,
};

const characterReducer = (state = INITIAL_STATE, action) => {
  // Make sure the action is from the character sheet
  if (action.payload && action.payload.sheetType !== 'characters') {
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
        permissions: action.payload.permissions,
        reload: undefined,
      };
    case SheetActionTypes.UPDATE_SHEET_SUCCESS:
      return {
        ...state,
        error: null,
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
      if (createdResourceType === 'logs') createdResourceType = 'characterLogs';

      // If resource type is transaction, update the state accordingly
      if (createdResourceType === 'transactions') {
        const transactionType = newResource.sheetId === state.current._id ? 'sent' : 'received';

        return {
          ...state,
          error: null,
          current: {
            ...state.current,
            transactions: {
              ...state.current.transactions,
              [transactionType]: [newResource, ...state.current[createdResourceType][transactionType]],
            },
          },
        };
      }

      // Otherwise, return updates as normal
      return {
        ...state,
        error: null,
        current: {
          ...state.current,
          [createdResourceType]: [newResource, ...state.current[createdResourceType]],
        },
      };
    case SheetActionTypes.UPDATE_SHEET_RESOURCE_SUCCESS:
      let { resourceType: updatedResourceType, updatedResource } = action.payload;
      if (updatedResourceType === 'logs') updatedResourceType = 'characterLogs';

      // If resource type is transaction, update the state accordingly
      if (updatedResourceType === 'transactions') {
        const transactionType = updatedResource.sheetId === state.current._id ? 'sent' : 'received';

        return {
          ...state,
          error: null,
          current: {
            ...state.current,
            transactions: {
              ...state.current.transactions,
              [transactionType]: replaceItemById(state.current[updatedResourceType][transactionType], updatedResource._id, updatedResource),
            },
          },
        };
      }

      // Otherwise, return updates as normal
      return {
        ...state,
        error: null,
        current: {
          ...state.current,
          [updatedResourceType]: replaceItemById(state.current[updatedResourceType], updatedResource._id, updatedResource),
        },
      };
    case SheetActionTypes.DELETE_SHEET_RESOURCE_SUCCESS:
      let { resourceType: deletedResourceType, resourceId } = action.payload;
      if (deletedResourceType === 'logs') deletedResourceType = 'characterLogs';

      // If resource type is transaction, update the state accordingly
      if (deletedResourceType === 'transactions') {
        // Set transaction type
        let transactionType = 'received';
        if (state.current.transactions.sent.find(transac => transac._id === resourceId)) transactionType = 'sent';

        return {
          ...state,
          error: null,
          current: {
            ...state.current,
            transactions: {
              ...state.current.transactions,
              [transactionType]: removeItemById(state.current[deletedResourceType][transactionType], resourceId),
            },
          },
        };
      }

      // Otherwise, return updates as normal
      return {
        ...state,
        error: null,
        current: {
          ...state.current,
          [deletedResourceType]: removeItemById(state.current[deletedResourceType], resourceId),
        },
      };
    case SheetActionTypes.ADD_CAMPAIGN_TO_CHARACTER_SUCCESS:
      return {
        ...state,
        error: null,
        current: {
          ...state.current,
          campaign: action.payload.campaign,
        },
      };
    case SheetActionTypes.REMOVE_CHARACTER_FROM_CAMPAIGN_SUCCESS:
      return {
        ...state,
        error: null,
        current: {
          ...state.current,
          campaign: undefined,
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
    case AppActionTypes.SET_MODAL:
    case AppActionTypes.SET_SLIDE_OVER:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export default characterReducer;
