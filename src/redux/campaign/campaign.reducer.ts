import { SheetActionTypes, SheetAction } from '../sheet/sheet.types';

import { replaceItemById, removeItemById } from '../../utils/helpers/arrays';

import { PlayerResourceType, SheetPermissions, CampaignSheet } from '../../models/sheet';
import { AppError } from '../../models/app';
import { Log } from '../../models/sheet/resources';

export interface CampaignState {
  current: CampaignSheet | null;
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

const campaignReducer = (state: CampaignState = INITIAL_STATE, action: SheetAction): CampaignState => {
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
        current: action.payload.currentSheet as CampaignSheet,
        loading: false,
        error: null,
        reload: undefined,
      };
    case SheetActionTypes.UPDATE_SHEET_SUCCESS:
      if (!state.current) return state;

      return {
        ...state,
        error: null,
        current: {
          ...state.current,
          ...(action.payload.updatedSheet as CampaignSheet),
          // prevent full players array from being overwritten by min players array
          players: state.current.players,
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

      // If resource type is transaction, update the state accordingly
      if (createdResourceType === 'logs') {
        return {
          ...state,
          error: null,
          current: {
            ...state.current,
            captainsLogs: [newResource as Log, ...state.current.captainsLogs],
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
          [createdResourceType]: [newResource, ...state.current[createdResourceType]],
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
            captainsLogs: replaceItemById(state.current.captainsLogs, updatedResource._id, updatedResource),
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
          [updatedResourceType]: replaceItemById(state.current[updatedResourceType], updatedResource._id, updatedResource),
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
            captainsLogs: removeItemById(state.current.captainsLogs, resourceId),
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
        reload: 'A new player has joined your campaign. Please refresh to get the latest data.',
      };
    case SheetActionTypes.REMOVE_CHARACTER_FROM_CAMPAIGN_SUCCESS:
      if (!state.current) return state;

      return {
        ...state,
        error: null,
        current: {
          ...state.current,
          players: removeItemById(state.current.players, action.payload.data.metadata.charId),
        },
      };
    case SheetActionTypes.UPDATE_PLAYER_SUCCESS:
      if (!state.current) return state;

      const { updatedPlayer } = action.payload;

      const oldPlayer = state.current.players.find(player => player._id === action.payload.updatedPlayer._id);

      return {
        ...state,
        current: {
          ...state.current,
          players: replaceItemById(state.current.players, updatedPlayer._id, { ...oldPlayer, ...updatedPlayer }),
        },
      };
    case SheetActionTypes.CREATE_PLAYER_RESOURCE_SUCCESS:
      if (!state.current) return state;

      const oldPlayerCreate = state.current.players.find(player => player._id === action.payload.playerId);

      if (!oldPlayerCreate) {
        return state;
      }

      // Transactions, Logs, and Notes are not kept track of in players array
      if (action.payload.resourceType === 'transactions' || action.payload.resourceType === 'logs' || action.payload.resourceType === 'notes') {
        return state;
      }

      return {
        ...state,
        current: {
          ...state.current,
          players: replaceItemById(state.current.players, action.payload.playerId, {
            ...oldPlayerCreate,
            [action.payload.resourceType]: [action.payload.newResource, ...oldPlayerCreate[action.payload.resourceType as unknown as PlayerResourceType]],
          }),
        },
      };
    case SheetActionTypes.UPDATE_PLAYER_RESOURCE_SUCCESS:
      if (!state.current) return state;

      const oldPlayerUpdate = state.current.players.find(player => player._id === action.payload.playerId);

      if (!oldPlayerUpdate) {
        return state;
      }

      // Transactions, Logs, and Notes are not kept track of in players array
      if (action.payload.resourceType === 'transactions' || action.payload.resourceType === 'logs' || action.payload.resourceType === 'notes') {
        return state;
      }

      return {
        ...state,
        current: {
          ...state.current,
          players: replaceItemById(state.current.players, action.payload.playerId, {
            ...oldPlayerUpdate,
            [action.payload.resourceType]: replaceItemById(
              oldPlayerUpdate[action.payload.resourceType as unknown as PlayerResourceType],
              action.payload.updatedResource._id,
              action.payload.updatedResource
            ),
          }),
        },
      };
    case SheetActionTypes.DELETE_PLAYER_RESOURCE_SUCCESS:
      if (!state.current) return state;

      const oldPlayerDelete = state.current.players.find(player => player._id === action.payload.playerId);

      if (!oldPlayerDelete) {
        return state;
      }

      // Transactions, Logs, and Notes are not kept track of in players array
      if (action.payload.resourceType === 'transactions' || action.payload.resourceType === 'logs' || action.payload.resourceType === 'notes') {
        return state;
      }

      return {
        ...state,
        current: {
          ...state.current,
          players: replaceItemById(state.current.players, action.payload.playerId, {
            ...oldPlayerDelete,
            [action.payload.resourceType]: removeItemById(oldPlayerDelete[action.payload.resourceType as unknown as PlayerResourceType], action.payload.resourceId),
          }),
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
