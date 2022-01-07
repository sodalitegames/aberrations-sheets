import io from 'socket.io-client';

class SocketConnection {
  constructor(namespace) {
    this.socket = this.connect(namespace);
  }

  connect(namespace) {
    return io.connect('http://localhost:2341', {
      withCredentials: true,
      extraHeaders: {
        'my-custom-header': 'abcd',
      },
    });
  }

  joinRoom(roomName) {
    this.socket.emit('joinRoom', roomName);
  }
}

export default SocketConnection;
