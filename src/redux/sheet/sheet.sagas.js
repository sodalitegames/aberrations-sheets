import { takeLatest, takeEvery, put, all, call } from 'redux-saga/effects';

import SheetActionTypes from './sheet.types';

import ChangesTypes from '../../utils/ChangesTypes';

import { addNotification, setSlideOver, setModal, setNestedModal } from '../app/app.actions';
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
import { fetchSpecies } from '../../apis/aberrations.api';

import charSocket from '../../sockets/character';
import campSocket from '../../sockets/campaign';

const socket = {
  characters: charSocket,
  campaigns: campSocket,
};

// FETCH CURRENT SHEET
export function* onFetchCurrentSheetStart() {
  yield takeLatest(SheetActionTypes.FETCH_CURRENT_SHEET_START, fetchCurrentSheet);
}

export function* fetchCurrentSheet({ payload: { sheetType, sheetId } }) {
  try {
    const response = yield getSheet(sheetType, sheetId);

    if (sheetType === 'characters') {
      // If it is a character sheet, fetch the species data and append it to the sheet data
      const resourceResponse = yield fetchSpecies(`?_id=${response.data.data.sheet.speciesId}`);
      const { id, name, ability, appearance, basicInfo, stats } = resourceResponse.data[0];
      yield put(fetchCurrentSheetSuccess(sheetType, { ...response.data.data.sheet, species: { id, name, ability, appearance, basicInfo, stats } }, response.data.data.permissions));
      return;
    }

    yield put(fetchCurrentSheetSuccess(sheetType, response.data.data.sheet));
  } catch (err) {
    yield put(fetchCurrentSheetFailure(sheetType, err.response || err));
  }
}

// UPDATE SHEET
export function* onUpdateSheetStart() {
  yield takeLatest(SheetActionTypes.UPDATE_SHEET_START, updateSheet);
}

export function* updateSheet({ payload: { sheetType, sheetId, body, config } }) {
  try {
    const response = yield updateSheetCall(sheetType, sheetId, body);

    // Emit changes to connected clients
    socket[sheetType].emit('changes', { sheet: sheetType, type: ChangesTypes.updateSheet, room: sheetId, args: [sheetType, response.data.data.sheet] });

    yield put(updateSheetSuccess(sheetType, response.data.data.sheet));

    // Add a notification
    yield put(addNotification({ heading: 'Updated', message: 'Your sheet has been updated' }));

    // Close out the modal, nestedModal, or slideover if it is open
    if (config?.slideOver) yield put(setSlideOver(null));
    if (config?.modal) yield put(setModal(null));
    if (config?.nestedModal) yield put(setNestedModal(null));
  } catch (err) {
    yield put(updateSheetFailure(sheetType, err.response.data));
  }
}

// DELETE SHEET
export function* onDeleteSheetStart() {
  yield takeLatest(SheetActionTypes.DELETE_SHEET_START, deleteSheet);
}

export function* deleteSheet({ payload: { sheetType, sheetId, config } }) {
  try {
    const response = yield deleteSheetCall(sheetType, sheetId);

    // Console log data
    console.log('Deleted Sheet', response.data);

    // Emit changes to connected clients
    socket[sheetType].emit('changes', { sheet: sheetType, type: ChangesTypes.deleteSheet, room: sheetId, args: [sheetType, sheetId, response.data.data] });

    yield put(deleteSheetSuccess(sheetType, sheetId, response.data.data));

    // Add a notification
    yield put(addNotification({ heading: 'Deleted', message: 'Your sheet has been deleted' }));

    // Close out the modal, nestedModal, or slideover if it is open
    if (config?.slideOver) yield put(setSlideOver(null));
    if (config?.modal) yield put(setModal(null));
    if (config?.nestedModal) yield put(setNestedModal(null));
  } catch (err) {
    yield put(deleteSheetFailure(sheetType, err.response.data));
  }
}

// GET SHEET RESOURCES
export function* onFetchSheetResourcesStart() {
  yield takeLatest(SheetActionTypes.FETCH_SHEET_RESOURCES_START, fetchSheetResources);
}

export function* fetchSheetResources({ payload: { sheetType, sheetId, resourceType } }) {
  try {
    const response = yield getResources(sheetType, sheetId, resourceType);
    yield put(fetchSheetResourcesSuccess(sheetType, response.data.data.docs));
  } catch (err) {
    yield put(fetchSheetResourcesFailure(sheetType, err.response.data));
  }
}

// CREATE SHEET RESOURCE
export function* onCreateSheetResourceStart() {
  yield takeLatest(SheetActionTypes.CREATE_SHEET_RESOURCE_START, createSheetResource);
}

export function* createSheetResource({ payload: { sheetType, sheetId, resourceType, body, config } }) {
  try {
    const response = yield createResource(sheetType, sheetId, resourceType, body);

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

    // Emit changes to connected clients
    socket[sheetType].emit('changes', { sheet: sheetType, type: ChangesTypes.createSheetResource, room: sheetId, args: [sheetType, resourceType, response.data.data.doc] });

    yield put(createSheetResourceSuccess(sheetType, resourceType, response.data.data.doc));

    // Add a notification
    yield put(addNotification({ heading: `${resourceType} created`, message: `${response.data.data.doc.name || resourceType} has been created` }));

    // Close out the modal, nestedModal, or slideover if it is open
    if (config?.slideOver) yield put(setSlideOver(null));
    if (config?.modal) yield put(setModal(null));
    if (config?.nestedModal) yield put(setNestedModal(null));
  } catch (err) {
    yield put(createSheetResourceFailure(sheetType, err.response.data));
  }
}

// UPDATE SHEET RESOURCE
export function* onUpdateSheetResourceStart() {
  yield takeEvery(SheetActionTypes.UPDATE_SHEET_RESOURCE_START, updateSheetResource);
}

export function* updateSheetResource({ payload: { sheetType, sheetId, resourceType, resourceId, body, config } }) {
  try {
    const response = yield updateResource(sheetType, sheetId, resourceType, resourceId, body);

    // If resource is invite and the invitation was just accepted, add the campaign sheet to the redux state
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

      // Add a notification
      yield put(addNotification({ heading: 'Joined Campaign', message: `You have joined ${response.data.data.campaign.name}` }));
    }

    // Send to both characters and campaigns if the resource is an invite
    if (resourceType === 'invites') {
      // Emit changes to connected clients, both character and campaign sheets
      socket['characters'].emit('changes', {
        sheet: 'characters',
        type: ChangesTypes.updateSheetResource,
        room: response.data.data.doc.charSheetId,
        args: ['characters', resourceType, response.data.data.doc],
      });
      socket['campaigns'].emit('changes', {
        sheet: 'campaigns',
        type: ChangesTypes.updateSheetResource,
        room: response.data.data.doc.sheetId,
        args: ['campaigns', resourceType, response.data.data.doc],
      });
    } else {
      // Emit changes to connected clients
      socket[sheetType].emit('changes', { sheet: sheetType, type: ChangesTypes.updateSheetResource, room: sheetId, args: [sheetType, resourceType, response.data.data.doc] });
    }

    yield put(updateSheetResourceSuccess(sheetType, resourceType, response.data.data.doc));

    // Add a notification
    yield put(addNotification({ heading: `${resourceType} updated`, message: `${response.data.data.doc.name || resourceType} has been updated` }));

    // Close out the modal, nestedModal, or slideover if it is open
    if (config?.slideOver) yield put(setSlideOver(null));
    if (config?.modal) yield put(setModal(null));
    if (config?.nestedModal) yield put(setNestedModal(null));
  } catch (err) {
    yield put(updateSheetResourceFailure(sheetType, err.response.data));
  }
}

// DELETE SHEET RESOURCE
export function* onDeleteSheetResourceStart() {
  yield takeLatest(SheetActionTypes.DELETE_SHEET_RESOURCE_START, deleteSheetResource);
}

export function* deleteSheetResource({ payload: { sheetType, sheetId, resourceType, resourceId, config } }) {
  try {
    const response = yield deleteResource(sheetType, sheetId, resourceType, resourceId);

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

    // Emit changes to connected clients
    socket[sheetType].emit('changes', { sheet: sheetType, type: ChangesTypes.deleteSheetResource, room: sheetId, args: [sheetType, resourceType, resourceId, response.data.data] });

    yield put(deleteSheetResourceSuccess(sheetType, resourceType, resourceId, response.data.data));

    // Add a notification
    yield put(addNotification({ heading: `${resourceType} deleted`, message: `${resourceType} has been deleted` }));

    // Close out the modal, nestedModal, or slideover if it is open
    if (config?.slideOver) yield put(setSlideOver(null));
    if (config?.modal) yield put(setModal(null));
    if (config?.nestedModal) yield put(setNestedModal(null));
  } catch (err) {
    yield put(deleteSheetResourceFailure(sheetType, err.response.data));
  }
}

// REMOVE CHARACTER FROM CAMPAIGN
export function* onRemoveCharacterFromCampaignStart() {
  yield takeLatest(SheetActionTypes.REMOVE_CHARACTER_FROM_CAMPAIGN_START, removeCharacterFromCampaign);
}

export function* removeCharacterFromCampaign({ payload: { sheetType, sheetId, body, config } }) {
  if (sheetType === 'characters') {
    try {
      const response = yield leaveCampaign(sheetType, sheetId);

      // Console log data
      console.log('Left Campaign', response.data);

      // Emit changes to connected clients
      socket['characters'].emit('changes', { sheet: 'characters', type: ChangesTypes.removeCharacterFromCampaign, room: sheetId, args: ['characters', response.data] });
      socket['campaigns'].emit('changes', { sheet: 'campaigns', type: ChangesTypes.removeCharacterFromCampaign, room: response.data.metadata.campId, args: ['campaigns', response.data] });

      yield put(removeCharacterFromCampaignSuccess(sheetType, response.data));

      // Add a notification
      yield put(addNotification({ heading: `Left Campaign`, message: `You have left Campaign #${response.data.metadata.campId}` }));

      // Close out the modal, nestedModal, or slideover if it is open
      if (config?.slideOver) yield put(setSlideOver(null));
      if (config?.modal) yield put(setModal(null));
      if (config?.nestedModal) yield put(setNestedModal(null));
    } catch (err) {
      yield put(removeCharacterFromCampaignFailure(sheetType, err.response.data));
    }
  }

  if (sheetType === 'campaigns') {
    try {
      const response = yield removePlayer(sheetType, sheetId, body);

      // Console log data
      console.log('Removed Player', response.data);

      // Emit changes to connected clients
      socket['characters'].emit('changes', { sheet: 'characters', type: ChangesTypes.removeCharacterFromCampaign, room: response.data.metadata.charId, args: ['characters', response.data] });
      socket['campaigns'].emit('changes', { sheet: 'campaigns', type: ChangesTypes.removeCharacterFromCampaign, room: sheetId, args: ['campaigns', response.data] });

      yield put(removeCharacterFromCampaignSuccess(sheetType, response.data));

      // Add a notification
      yield put(addNotification({ heading: `Player Removed`, message: `Character #${response.data.metadata.charId} has been removed from your campaign` }));

      // Close out the modal, nestedModal, or slideover if it is open
      if (config?.slideOver) yield put(setSlideOver(null));
      if (config?.modal) yield put(setModal(null));
      if (config?.nestedModal) yield put(setNestedModal(null));
    } catch (err) {
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
