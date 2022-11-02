import io from 'socket.io-client';

import { store } from '../redux/store';

import ChangesTypes from '../utils/ChangesTypes';

import {
  updateSheetSuccess,
  deleteSheetSuccess,
  createSheetResourceSuccess,
  updateSheetResourceSuccess,
  deleteSheetResourceSuccess,
  addCampaignToCharacterSuccess,
  removeCharacterFromCampaignSuccess,
  updatePlayerSuccess,
  createPlayerResourceSuccess,
  updatePlayerResourceSuccess,
  deletePlayerResourceSuccess,
} from '../redux/sheet/sheet.actions';

let campSocket = io.connect(`${process.env.REACT_APP_SOCKET_SERVER}/campaigns`, {
  withCredentials: true,
  extraHeaders: {
    'socket-header-secret': process.env.REACT_APP_SOCKET_HEADER_SECRET,
  },
});

campSocket.on('message', message => {
  console.log('socket:message:', message);
});

campSocket.on('updates', ({ sheet, room, type, args }) => {
  console.log('socket:updates:', sheet, room, type, args);

  switch (type) {
    case ChangesTypes.updateSheet:
      store.dispatch(updateSheetSuccess(...args));
      return;

    case ChangesTypes.deleteSheet:
      store.dispatch(deleteSheetSuccess(...args));
      return;

    case ChangesTypes.createSheetResource:
      store.dispatch(createSheetResourceSuccess(...args));
      return;

    case ChangesTypes.updateSheetResource:
      store.dispatch(updateSheetResourceSuccess(...args));
      return;

    case ChangesTypes.deleteSheetResource:
      store.dispatch(deleteSheetResourceSuccess(...args));
      return;

    case ChangesTypes.addCampaignToCharacter:
      store.dispatch(addCampaignToCharacterSuccess(...args));
      return;

    case ChangesTypes.removeCharacterFromCampaign:
      store.dispatch(removeCharacterFromCampaignSuccess(...args));
      return;

    case ChangesTypes.updatePlayer:
      store.dispatch(updatePlayerSuccess(...args));
      return;

    case ChangesTypes.createPlayerResource:
      store.dispatch(createPlayerResourceSuccess(...args));
      return;

    case ChangesTypes.updatePlayerResource:
      store.dispatch(updatePlayerResourceSuccess(...args));
      return;

    case ChangesTypes.deletePlayerResource:
      store.dispatch(deletePlayerResourceSuccess(...args));
      return;

    default:
      return;
  }
});

export default campSocket;
