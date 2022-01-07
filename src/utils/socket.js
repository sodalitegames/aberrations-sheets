import io from 'socket.io-client';
let socket = io.connect('http://localhost:2341', {
  withCredentials: true,
  extraHeaders: {
    'my-custom-header': 'abcd',
  },
});

socket.emit('joinRoom', 1234);

socket.on('message', message => {
  console.log('message', message);
});

export default socket;
