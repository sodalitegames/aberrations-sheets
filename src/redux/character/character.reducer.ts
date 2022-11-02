import { SheetActionTypes, SheetAction } from '../sheet/sheet.types';

import { replaceItemById, removeItemById } from '../../utils/helpers/arrays';

import { CharacterResourceType, SheetPermissions } from '../../models/interfaces/sheet';
import { AppError } from '../../models/interfaces/app';
import { CharacterSheet } from '../../models/interfaces/sheet/CharacterSheet';
import { Log } from '../../models/interfaces/sheet/resources';

export interface CharacterState {
  current: CharacterSheet | null;
  loading: boolean;
  error: AppError | null;
  permissions: SheetPermissions | undefined;
  reload: string | undefined;
}

const INITIAL_STATE = {
  current: null,
  loading: false,
  error: null,
  permissions: undefined,
  reload: undefined,
};

const characterReducer = (state: CharacterState = INITIAL_STATE, action: SheetAction): CharacterState => {
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
        current: action.payload.currentSheet as CharacterSheet,
        loading: false,
        error: null,
        permissions: action.payload.permissions,
        reload: undefined,
      };
    case SheetActionTypes.UPDATE_SHEET_SUCCESS:
      if (!state.current) return state;

      return {
        ...state,
        error: null,
        current: {
          ...state.current,
          ...(action.payload.updatedSheet as CharacterSheet),
        },
      };
    case SheetActionTypes.DELETE_SHEET_SUCCESS:
      return {
        ...state,
        current: null,
        error: null,
        permissions: undefined,
      };
    case SheetActionTypes.CREATE_SHEET_RESOURCE_SUCCESS:
      if (!state.current) return state;

      let { resourceType: createdResourceType, newResource } = action.payload;

      // If resource type is a log, update the state accordingly
      if (createdResourceType === 'logs') {
        return {
          ...state,
          error: null,
          current: {
            ...state.current,
            characterLogs: [newResource as Log, ...state.current.characterLogs],
          },
        };
      }

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
          [createdResourceType]: [newResource, ...state.current[createdResourceType as unknown as CharacterResourceType]],
        },
      };
    case SheetActionTypes.UPDATE_SHEET_RESOURCE_SUCCESS:
      if (!state.current) return state;

      let { resourceType: updatedResourceType, updatedResource } = action.payload;

      // If resource type is transaction, update the state accordingly
      if (updatedResourceType === 'logs') {
        return {
          ...state,
          error: null,
          current: {
            ...state.current,
            characterLogs: replaceItemById(state.current.characterLogs, updatedResource._id, updatedResource),
          },
        };
      }

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
          [updatedResourceType]: replaceItemById(state.current[updatedResourceType as unknown as CharacterResourceType], updatedResource._id, updatedResource),
        },
      };
    case SheetActionTypes.DELETE_SHEET_RESOURCE_SUCCESS:
      if (!state.current) return state;

      let { resourceType: deletedResourceType, resourceId } = action.payload;

      // If resource type is transaction, update the state accordingly
      if (deletedResourceType === 'logs') {
        return {
          ...state,
          error: null,
          current: {
            ...state.current,
            characterLogs: removeItemById(state.current.characterLogs, resourceId),
          },
        };
      }

      // If resource type is transaction, update the state accordingly
      if (deletedResourceType === 'transactions') {
        // Set transaction type
        const transactionType = state.current.transactions.sent.find(transac => transac._id === resourceId) ? 'sent' : 'received';

        return {
          ...state,
          error: null,
          current: {
            ...state.current,
            transactions: {
              ...state.current.transactions,
              [transactionType]: removeItemById(state.current.transactions[transactionType], resourceId),
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
          [deletedResourceType]: removeItemById(state.current[deletedResourceType as unknown as CharacterResourceType], resourceId),
        },
      };
    case SheetActionTypes.ADD_CAMPAIGN_TO_CHARACTER_SUCCESS:
      if (!state.current) return state;

      return {
        ...state,
        error: null,
        current: {
          ...state.current,
          campaign: action.payload.campaign,
        },
      };
    case SheetActionTypes.REMOVE_CHARACTER_FROM_CAMPAIGN_SUCCESS:
      if (!state.current) return state;

      return {
        ...state,
        error: null,
        current: {
          ...state.current,
          campaign: null,
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

export default characterReducer;
