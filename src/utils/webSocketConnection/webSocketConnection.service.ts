import socketClient, { Socket } from 'socket.io-client';

const SERVER = 'http://localhost:5000';

let socket : Socket;

export const connectWithWebSocket = () => {
  socket = socketClient(SERVER, {
    withCredentials: true
  });
  
  socket.on('connection', () => {
    console.log('succesfully connected with websocket server ');
    console.log(socket.id);
  });
}