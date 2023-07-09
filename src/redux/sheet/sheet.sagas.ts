import { takeLatest, takeEvery, put, all, call } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';

import {
  CreateSheetResourceStartAction,
  DeleteSheetResourceStartAction,
  DeleteSheetStartAction,
  FetchCurrentSheetStartAction,
  FetchSheetResourcesStartAction,
  RemoveCharacterFromCampaignStartAction,
  SheetActionTypes,
  UpdateSheetResourceStartAction,
  UpdateSheetStartAction,
} from './sheet.types';

import ChangesTypes from '../../utils/ChangesTypes';

import { addNotification, closeSlideOver, closeModal, closeNestedModal } from '../app/app.actions';
import {
  fetchCurrentSheetSuccess,
  fetchCurrentSheetFailure,
  updateSheetSuccess,
  updateSheetFailure,
  deleteSheetSuccess,
  deleteSheetFailure,
  fetchSheetResourcesSuccess,
  fetchSheetResourcesFailure,
  createSheetResourceSuccess,
  createSheetResourceFailure,
  updateSheetResourceSuccess,
  updateSheetResourceFailure,
  deleteSheetResourceSuccess,
  deleteSheetResourceFailure,
  removeCharacterFromCampaignSuccess,
  removeCharacterFromCampaignFailure,
  addCampaignToCharacterSuccess,
  updatePlayerSuccess,
  createPlayerResourceSuccess,
  updatePlayerResourceSuccess,
  deletePlayerResourceSuccess,
} from './sheet.actions';

import {
  createResource,
  deleteResource,
  deleteSheet as deleteSheetCall,
  getResources,
  getSheet,
  leaveCampaign,
  removePlayer,
  updateResource,
  updateSheet as updateSheetCall,
} from '../../apis/sheets.api';

import charSocket from '../../sockets/character';
import campSocket from '../../sockets/campaign';
import playerSocket from '../../sockets/player';

import { SheetType } from '../../models/sheet';
import { Combatant } from '../../models/sheet/resources';

const socket = {
  characters: charSocket,
  campaigns: campSocket,
  players: playerSocket,
};

// FETCH CURRENT SHEET
export function* onFetchCurrentSheetStart() {
  yield takeLatest(SheetActionTypes.FETCH_CURRENT_SHEET_START, fetchCurrentSheet);
}

export function* fetchCurrentSheet({ payload: { sheetType, sheetId } }: FetchCurrentSheetStartAction) {
  try {
    const response: AxiosResponse<any> = yield getSheet(sheetType, sheetId);
    yield put(fetchCurrentSheetSuccess(sheetType, response.data.data.sheet, response.data.data.permissions));
  } catch (err: any) {
    yield put(fetchCurrentSheetFailure(sheetType, err.response || err));
  }
}

// UPDATE SHEET
export function* onUpdateSheetStart() {
  yield takeLatest(SheetActionTypes.UPDATE_SHEET_START, updateSheet);
}

export function* updateSheet({ payload: { sheetType, sheetId, body, config } }: UpdateSheetStartAction) {
  try {
    const response: AxiosResponse<any> = yield updateSheetCall(sheetType, sheetId, body);

    if (config?.forPlayer) {
      yield put(updatePlayerSuccess(SheetType.campaigns, response.data.data.sheet));
      // Emit socket changes to connected campaign sheets
      socket['players'].emit('changes', { sheet: 'campaigns', type: ChangesTypes.updatePlayer, room: sheetId, args: ['campaigns', response.data.data.sheet] });
      // Emit changes to connected character sheet clients
      socket['characters'].emit('changes', { sheet: 'characters', type: ChangesTypes.updateSheet, room: sheetId, args: ['characters', response.data.data.sheet] });
    } else {
      // Emit changes to connected clients
      socket[sheetType].emit('changes', { sheet: sheetType, type: ChangesTypes.updateSheet, room: sheetId, args: [sheetType, response.data.data.sheet] });

      if (sheetType === 'characters' && response.data.data.sheet.campaign) {
        // Emit changes to connected campaign sheet clients
        // AKA campaigns that have this character as one of its players
        socket['players'].emit('changes', { sheet: 'campaigns', type: ChangesTypes.updatePlayer, room: sheetId, args: ['campaigns', response.data.data.sheet] });
      }

      yield put(updateSheetSuccess(sheetType, response.data.data.sheet));
    }

    // Add a notification, if configured to do so
    if (config?.notification) yield put(addNotification(config?.notification));

    // Close out the modal, nestedModal, or slideover if it is open
    if (config?.slideOver) yield put(closeSlideOver());
    if (config?.modal) yield put(closeModal());
    if (config?.nestedModal) yield put(closeNestedModal());
  } catch (err: any) {
    yield put(updateSheetFailure(sheetType, err.response.data));
  }
}

// DELETE SHEET
export function* onDeleteSheetStart() {
  yield takeLatest(SheetActionTypes.DELETE_SHEET_START, deleteSheet);
}

export function* deleteSheet({ payload: { sheetType, sheetId, config } }: DeleteSheetStartAction) {
  try {
    const response: AxiosResponse<any> = yield deleteSheetCall(sheetType, sheetId);

    // Console log data
    console.log('Deleted Sheet', response.data);

    // Emit changes to connected clients
    socket[sheetType].emit('changes', { sheet: sheetType, type: ChangesTypes.deleteSheet, room: sheetId, args: [sheetType, sheetId, response.data.data] });

    yield put(deleteSheetSuccess(sheetType, sheetId, response.data.data));

    // Add a notification, if configured to do so
    if (config?.notification) yield put(addNotification(config?.notification));

    // Close out the modal, nestedModal, or slideover if it is open
    if (config?.slideOver) yield put(closeSlideOver());
    if (config?.modal) yield put(closeModal());
    if (config?.nestedModal) yield put(closeNestedModal());
  } catch (err: any) {
    yield put(deleteSheetFailure(sheetType, err.response.data));
  }
}

// GET SHEET RESOURCES
export function* onFetchSheetResourcesStart() {
  yield takeLatest(SheetActionTypes.FETCH_SHEET_RESOURCES_START, fetchSheetResources);
}

export function* fetchSheetResources({ payload: { sheetType, sheetId, resourceType } }: FetchSheetResourcesStartAction) {
  try {
    const response: AxiosResponse<any> = yield getResources(sheetType, sheetId, resourceType);
    yield put(fetchSheetResourcesSuccess(sheetType, response.data.data.docs));
  } catch (err: any) {
    yield put(fetchSheetResourcesFailure(sheetType, err.response.data));
  }
}

// CREATE SHEET RESOURCE
export function* onCreateSheetResourceStart() {
  yield takeLatest(SheetActionTypes.CREATE_SHEET_RESOURCE_START, createSheetResource);
}

export function* createSheetResource({ payload: { sheetType, sheetId, resourceType, body, config } }: CreateSheetResourceStartAction) {
  try {
    const response: AxiosResponse<any> = yield createResource(sheetType, sheetId, resourceType, body);

    // If resource is invite, then update the character sheets it is being sent to as well
    if (resourceType === 'invites') {
      // Emit changes to character sheets
      socket['characters'].emit('changes', {
        sheet: 'characters',
        type: ChangesTypes.createSheetResource,
        room: response.data.data.doc.charSheetId,
        args: ['characters', resourceType, response.data.data.doc],
      });
    }

    // If resource is a transaction, then update the sheets it is being sent to as well
    if (resourceType === 'transactions') {
      // Emit changes to the sheets
      socket[response.data.data.doc.receivingSheetType as SheetType].emit('changes', {
        sheet: response.data.data.doc.receivingSheetType,
        type: ChangesTypes.createSheetResource,
        room: response.data.data.doc.receivingSheetId,
        args: [response.data.data.doc.receivingSheetType, resourceType, response.data.data.doc],
      });
    }

    if (config?.forPlayer) {
      yield put(createPlayerResourceSuccess(SheetType.campaigns, sheetId, resourceType, response.data.data.doc));
      // Emit socket changes to connected campaign sheets
      socket['players'].emit('changes', { sheet: 'campaigns', type: ChangesTypes.createPlayerResource, room: sheetId, args: ['campaigns', sheetId, resourceType, response.data.data.doc] });
      // Emit changes to connected character sheet clients
      socket['characters'].emit('changes', { sheet: 'characters', type: ChangesTypes.createSheetResource, room: sheetId, args: ['characters', resourceType, response.data.data.doc] });
    } else {
      // Emit changes to connected clients
      socket[sheetType].emit('changes', { sheet: sheetType, type: ChangesTypes.createSheetResource, room: sheetId, args: [sheetType, resourceType, response.data.data.doc] });

      if (sheetType === 'characters') {
        // Emit changes to connected campaign sheet clients
        // AKA campaigns that have this character as one of its players
        socket['players'].emit('changes', { sheet: 'campaigns', type: ChangesTypes.createPlayerResource, room: sheetId, args: ['campaigns', sheetId, resourceType, response.data.data.doc] });
      }

      yield put(createSheetResourceSuccess(sheetType, resourceType, response.data.data.doc));
    }

    // Add a notification, if configured to do so
    if (config?.notification) yield put(addNotification(config?.notification));

    // Close out the modal, nestedModal, or slideover if it is open
    if (config?.slideOver) yield put(closeSlideOver());
    if (config?.modal) yield put(closeModal());
    if (config?.nestedModal) yield put(closeNestedModal());
  } catch (err: any) {
    yield put(createSheetResourceFailure(sheetType, err?.response?.data || err));
  }
}

// UPDATE SHEET RESOURCE
export function* onUpdateSheetResourceStart() {
  yield takeEvery(SheetActionTypes.UPDATE_SHEET_RESOURCE_START, updateSheetResource);
}

export function* updateSheetResource({ payload: { sheetType, sheetId, resourceType, resourceId, body, config } }: UpdateSheetResourceStartAction) {
  try {
    const response: AxiosResponse<any> = yield updateResource(sheetType, sheetId, resourceType, resourceId, body);

    // If resource is invite, and the invitation was just accepted, add the campaign sheet to the redux state
    if (resourceType === 'invites' && response.data.data.doc.status === 'Accepted') {
      // Emit changes to connected clients, both character and campaign sheets
      socket['characters'].emit('changes', {
        sheet: 'characters',
        type: ChangesTypes.addCampaignToCharacter,
        room: response.data.data.doc.charSheetId,
        args: ['characters', response.data.data.campaign],
      });
      socket['campaigns'].emit('changes', { sheet: 'campaigns', type: ChangesTypes.addCampaignToCharacter, room: response.data.data.doc.sheetId, args: ['campaigns', response.data.data.campaign] });

      yield put(addCampaignToCharacterSuccess(sheetType, response.data.data.campaign));

      // Add a notification to alert that they have joined the campaign
      yield put(addNotification({ status: 'success', heading: 'Joined Campaign', message: `You have joined ${response.data.data.campaign.name}` }));
    }

    // If the updated resource is a transaction, and the transaction was just accepted, make necessary updates
    if (resourceType === 'transactions' && response.data.data.doc.status === 'Accepted') {
      const updatedTransaction = response.data.data.doc;
      const { recipientSheet, recipientResource, senderSheet, senderResource } = response.data.data.metadata;

      console.log(response.data.data);

      // If transaction type is wallet, update the sheets, and emit socket events
      if (updatedTransaction.documentType === 'wallet' || updatedTransaction.sellPrice) {
        // Current sheet gets the recipient resource
        yield put(updateSheetSuccess(sheetType, recipientSheet));

        // Emit those same changes to connected clients
        socket[sheetType].emit('changes', { sheet: sheetType, type: ChangesTypes.updateSheet, room: sheetId, args: [sheetType, recipientSheet] });

        if (sheetType === 'characters') {
          // Emit changes to connected campaign sheet clients
          // AKA campaigns that have this character as one of its players
          socket['players'].emit('changes', { sheet: 'campaigns', type: ChangesTypes.updatePlayer, room: sheetId, args: ['campaigns', recipientSheet] });
        }

        // EMIT SENDER CHANGES TO THE SENDING SHEET, IN CASE THEY ARE ONLINE
        socket[updatedTransaction.sheetType as SheetType].emit('changes', {
          sheet: updatedTransaction.sheetType,
          type: ChangesTypes.updateSheet,
          room: updatedTransaction.sheetId,
          args: [updatedTransaction.sheetType, senderSheet],
        });

        if (sheetType === 'campaigns') {
          // Emit changes to connected campaign sheet clients
          // AKA campaigns that have this character as one of its players
          // They are the sender
          socket['players'].emit('changes', { sheet: 'campaigns', type: ChangesTypes.updatePlayer, room: updatedTransaction.sheetId, args: ['campaigns', senderSheet] });
        }
      }

      // If transaction type is not wallet, then update the resources and emit socket events
      if (updatedTransaction.documentType !== 'wallet') {
        // Current sheet gets the created resource added to it
        yield put(createSheetResourceSuccess(sheetType, updatedTransaction.documentType, recipientResource));

        // Emit those same changes to connected clients
        socket[sheetType].emit('changes', { sheet: sheetType, type: ChangesTypes.createSheetResource, room: sheetId, args: [sheetType, updatedTransaction.documentType, recipientResource] });

        if (sheetType === 'characters') {
          // Emit changes to connected campaign sheet clients
          // AKA campaigns that have this character as one of its players
          socket['players'].emit('changes', {
            sheet: 'campaigns',
            type: ChangesTypes.createPlayerResource,
            room: sheetId,
            args: ['campaigns', sheetId, updatedTransaction.documentType, recipientResource],
          });
        }

        // EMIT SENDER CHANGES TO THE SENDING SHEET, IN CASE THEY ARE ONLINE
        socket[updatedTransaction.sheetType as SheetType].emit('changes', {
          sheet: updatedTransaction.sheetType,
          type: ChangesTypes.updateSheetResource,
          room: updatedTransaction.sheetId,
          args: [updatedTransaction.sheetType, updatedTransaction.documentType, senderResource],
        });

        if (sheetType === 'campaigns') {
          // Emit changes to connected campaign sheet clients
          // AKA campaigns that have this character as one of its players
          // They are the senders
          socket['players'].emit('changes', {
            sheet: 'campaigns',
            type: ChangesTypes.updatePlayerResource,
            room: updatedTransaction.sheetId,
            args: ['campaigns', updatedTransaction.sheetId, updatedTransaction.documentType, senderResource],
          });
        }
      }
    }

    // If the resource is an invite, then update the other sheet is belongs to as well
    if (resourceType === 'invites') {
      // The current sheet is the sender
      if (sheetId === response.data.data.doc.sheetId) {
        // Update the recipient
        socket['characters'].emit('changes', {
          sheet: 'characters',
          type: ChangesTypes.updateSheetResource,
          room: response.data.data.doc.charSheetId,
          args: ['characters', resourceType, response.data.data.doc],
        });
      }

      // The current sheet is the recipient
      if (sheetId === response.data.data.doc.charSheetId) {
        // Update the sender
        socket['campaigns'].emit('changes', {
          sheet: 'campaigns',
          type: ChangesTypes.updateSheetResource,
          room: response.data.data.doc.sheetId,
          args: ['campaigns', resourceType, response.data.data.doc],
        });
      }
    }

    // If resource is a transaction, then update the other sheet it belongs to as well
    if (resourceType === 'transactions') {
      // If the current sheet is the sender
      if (sheetId === response.data.data.doc.sheetId) {
        // Update the recipient
        socket[response.data.data.doc.receivingSheetType as SheetType].emit('changes', {
          sheet: response.data.data.doc.receivingSheetType,
          type: ChangesTypes.updateSheetResource,
          room: response.data.data.doc.receivingSheetId,
          args: [response.data.data.doc.receivingSheetType, resourceType, response.data.data.doc],
        });
      }

      // If the current sheet is the recipient
      if (sheetId === response.data.data.doc.receivingSheetId) {
        // Update the sender
        socket[response.data.data.doc.sheetType as SheetType].emit('changes', {
          sheet: response.data.data.doc.sheetType,
          type: ChangesTypes.updateSheetResource,
          room: response.data.data.doc.sheetId,
          args: [response.data.data.doc.sheetType, resourceType, response.data.data.doc],
        });
      }
    }

    if (resourceType === 'combats') {
      if (sheetId === response.data.data.doc.sheetId) {
        response.data.data.doc.combatants.forEach((comba: Combatant) => {
          if (comba.type === 'players') {
            socket['characters'].emit('changes', {
              sheet: 'characters',
              type: ChangesTypes.updateSheetResource,
              room: comba._id,
              args: ['characters', resourceType, response.data.data.doc],
            });
          }
        });
      }

      if (response.data.data.doc.combatants.map((comba: Combatant) => comba._id).includes(sheetId)) {
        socket['campaigns'].emit('changes', {
          sheet: 'campaigns',
          type: ChangesTypes.updateSheetResource,
          room: response.data.data.doc.sheetId,
          args: ['campaigns', resourceType, response.data.data.doc],
        });
      }
    }

    if (config?.forPlayer) {
      yield put(updatePlayerResourceSuccess(SheetType.campaigns, sheetId, resourceType, response.data.data.doc));
      // Emit socket changes to connected campaign sheets
      socket['players'].emit('changes', { sheet: 'campaigns', type: ChangesTypes.updatePlayerResource, room: sheetId, args: ['campaigns', sheetId, resourceType, response.data.data.doc] });
      // Emit changes to connected character sheet clients
      socket['characters'].emit('changes', { sheet: 'characters', type: ChangesTypes.updateSheetResource, room: sheetId, args: ['characters', resourceType, response.data.data.doc] });
    } else {
      // Emit changes to connected clients
      socket[sheetType].emit('changes', { sheet: sheetType, type: ChangesTypes.updateSheetResource, room: sheetId, args: [sheetType, resourceType, response.data.data.doc] });

      if (sheetType === 'characters') {
        // Emit changes to connected campaign sheet clients
        // AKA campaigns that have this character as one of its players
        socket['players'].emit('changes', { sheet: 'campaigns', type: ChangesTypes.updatePlayerResource, room: sheetId, args: ['campaigns', sheetId, resourceType, response.data.data.doc] });
      }

      yield put(updateSheetResourceSuccess(sheetType, resourceType, response.data.data.doc));
    }

    // Add a notification, if configured to do so
    if (config?.notification) yield put(addNotification(config?.notification));

    // Close out the modal, nestedModal, or slideover if it is open
    if (config?.slideOver) yield put(closeSlideOver());
    if (config?.modal) yield put(closeModal());
    if (config?.nestedModal) yield put(closeNestedModal());
  } catch (err: any) {
    yield put(updateSheetResourceFailure(sheetType, err?.response?.data || err));
  }
}

// DELETE SHEET RESOURCE
export function* onDeleteSheetResourceStart() {
  yield takeLatest(SheetActionTypes.DELETE_SHEET_RESOURCE_START, deleteSheetResource);
}

export function* deleteSheetResource({ payload: { sheetType, sheetId, resourceType, resourceId, config } }: DeleteSheetResourceStartAction) {
  try {
    const response: AxiosResponse<any> = yield deleteResource(sheetType, sheetId, resourceType, resourceId);

    // Update the character sheet as well if resource is an invite
    // Note: Character sheets cannot delete invites
    if (resourceType === 'invites') {
      // Emit changes to character sheet
      socket['characters'].emit('changes', {
        sheet: 'characters',
        type: ChangesTypes.deleteSheetResource,
        room: response.data.metadata.charId,
        args: ['characters', resourceType, resourceId, response.data.data],
      });
    }

    // Update the recipient as well if the resource is a transaction
    // Note: Recipients cannot delete transactions
    if (resourceType === 'transactions') {
      // Update the recipient
      socket[response.data.metadata.receivingSheetType as SheetType].emit('changes', {
        sheet: response.data.metadata.receivingSheetType,
        type: ChangesTypes.deleteSheetResource,
        room: response.data.metadata.receivingSheetId,
        args: [response.data.metadata.receivingSheetType, resourceType, resourceId, response.data.data],
      });
    }

    if (config?.forPlayer) {
      yield put(deletePlayerResourceSuccess(SheetType.campaigns, sheetId, resourceType, resourceId, response.data.data));
      // Emit socket changes to connected campaign sheets
      socket['players'].emit('changes', { sheet: 'campaigns', type: ChangesTypes.deletePlayerResource, room: sheetId, args: ['campaigns', sheetId, resourceType, resourceId, response.data.data] });
      // Emit changes to connected character sheet clients
      socket['characters'].emit('changes', { sheet: 'characters', type: ChangesTypes.deleteSheetResource, room: sheetId, args: ['characters', resourceType, resourceId, response.data.data] });
    } else {
      // Emit changes to connected clients
      socket[sheetType].emit('changes', { sheet: sheetType, type: ChangesTypes.deleteSheetResource, room: sheetId, args: [sheetType, resourceType, resourceId, response.data.data] });

      if (sheetType === 'characters') {
        // Emit changes to connected campaign sheet clients
        // AKA campaigns that have this character as one of its players
        socket['players'].emit('changes', { sheet: 'campaigns', type: ChangesTypes.deletePlayerResource, room: sheetId, args: ['campaigns', sheetId, resourceType, resourceId, response.data.data] });
      }

      yield put(deleteSheetResourceSuccess(sheetType, resourceType, resourceId, response.data.data));
    }

    // Add a notification, if configured to do so
    if (config?.notification) yield put(addNotification(config?.notification));

    // Close out the modal, nestedModal, or slideover if it is open
    if (config?.slideOver) yield put(closeSlideOver());
    if (config?.modal) yield put(closeModal());
    if (config?.nestedModal) yield put(closeNestedModal());
  } catch (err: any) {
    yield put(deleteSheetResourceFailure(sheetType, err?.response?.data || err));
  }
}

// REMOVE CHARACTER FROM CAMPAIGN
export function* onRemoveCharacterFromCampaignStart() {
  yield takeLatest(SheetActionTypes.REMOVE_CHARACTER_FROM_CAMPAIGN_START, removeCharacterFromCampaign);
}

export function* removeCharacterFromCampaign({ payload: { sheetType, sheetId, body, config } }: RemoveCharacterFromCampaignStartAction) {
  if (sheetType === 'characters') {
    try {
      const response: AxiosResponse<any> = yield leaveCampaign(sheetType, sheetId);

      // Console log data
      console.log('Left Campaign', response.data);

      // Emit changes to connected clients
      socket['characters'].emit('changes', { sheet: 'characters', type: ChangesTypes.removeCharacterFromCampaign, room: sheetId, args: ['characters', response.data] });
      socket['campaigns'].emit('changes', { sheet: 'campaigns', type: ChangesTypes.removeCharacterFromCampaign, room: response.data.metadata.campId, args: ['campaigns', response.data] });

      yield put(removeCharacterFromCampaignSuccess(sheetType, response.data));

      // Add a notification, if configured to do so
      if (config?.notification) yield put(addNotification(config?.notification));

      // Close out the modal, nestedModal, or slideover if it is open
      if (config?.slideOver) yield put(closeSlideOver());
      if (config?.modal) yield put(closeModal());
      if (config?.nestedModal) yield put(closeNestedModal());
    } catch (err: any) {
      yield put(removeCharacterFromCampaignFailure(sheetType, err.response.data));
    }
  }

  if (sheetType === 'campaigns') {
    try {
      const response: AxiosResponse<any> = yield removePlayer(sheetType, sheetId, body);

      // Console log data
      console.log('Removed Player', response.data);

      // Emit changes to connected clients
      socket['characters'].emit('changes', { sheet: 'characters', type: ChangesTypes.removeCharacterFromCampaign, room: response.data.metadata.charId, args: ['characters', response.data] });
      socket['campaigns'].emit('changes', { sheet: 'campaigns', type: ChangesTypes.removeCharacterFromCampaign, room: sheetId, args: ['campaigns', response.data] });

      yield put(removeCharacterFromCampaignSuccess(sheetType, response.data));

      // Add a notification, if configured to do so
      if (config?.notification) yield put(addNotification(config?.notification));

      // Close out the modal, nestedModal, or slideover if it is open
      if (config?.slideOver) yield put(closeSlideOver());
      if (config?.modal) yield put(closeModal());
      if (config?.nestedModal) yield put(closeNestedModal());
    } catch (err: any) {
      yield put(removeCharacterFromCampaignFailure(sheetType, err.response.data));
    }
  }
}

// EXPORT SHEET SAGAS
export function* sheetSagas() {
  yield all([
    call(onFetchCurrentSheetStart),
    call(onUpdateSheetStart),
    call(onDeleteSheetStart),
    call(onFetchSheetResourcesStart),
    call(onCreateSheetResourceStart),
    call(onUpdateSheetResourceStart),
    call(onDeleteSheetResourceStart),
    call(onRemoveCharacterFromCampaignStart),
  ]);
}
