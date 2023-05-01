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
} from '../redux/sheet/sheet.actions';

let charSocket = io.connect(`${process.env.REACT_APP_SOCKET_SERVER}/characters`, {
  withCredentials: true,
  extraHeaders: {
    'socket-header-secret': process.env.REACT_APP_SOCKET_HEADER_SECRET,
  },
});

charSocket.on('message', message => {
  console.log('character:socket:message:', message);
});

charSocket.on('updates', ({ sheet, room, type, args }) => {
  console.log('character:socket:updates:', sheet, room, type, args);

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

    default:
      return;
  }
});

export default charSocket;
