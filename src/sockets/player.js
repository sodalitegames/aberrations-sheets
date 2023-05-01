import io from 'socket.io-client';

import { store } from '../redux/store';

import ChangesTypes from '../utils/ChangesTypes';

import { updatePlayerSuccess, createPlayerResourceSuccess, updatePlayerResourceSuccess, deletePlayerResourceSuccess } from '../redux/sheet/sheet.actions';

let playerSocket = io.connect(`${process.env.REACT_APP_SOCKET_SERVER}/players`, {
  withCredentials: true,
  extraHeaders: {
    'socket-header-secret': process.env.REACT_APP_SOCKET_HEADER_SECRET,
  },
});

playerSocket.on('message', message => {
  console.log('player:socket:message:', message);
});

playerSocket.on('updates', ({ sheet, room, type, args }) => {
  console.log('player:socket:updates:', sheet, room, type, args);

  switch (type) {
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

export default playerSocket;
