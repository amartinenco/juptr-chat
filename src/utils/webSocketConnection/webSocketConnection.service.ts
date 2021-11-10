import socketClient, { Socket } from 'socket.io-client';
import { signOutStart } from '../../redux/auth/auth.actions';
import { setActiveUsers } from '../../redux/chat/chat.actions';
import store from '../../redux/store';
import ILoggedIn from '../../types/logged-in.interface';
import { BROADCAST, IBroadcastData } from './webSocket.types';

const SERVER = 'http://localhost:5000';

let socket : Socket;

export const connectWithWebSocket = () => {
  socket = socketClient(SERVER, {
    withCredentials: true
  });
  
  socket.on('connect', () => {
    registerNewUser(socket.id)
  });

  socket.on('broadcast', (data) => {
    broadcastHandler(data);
  });

  socket.on('connect_error', err => {
    socket.disconnect();
    // store.dispatch(signOutStart());
  });
}

export const disconnectWebSocket = () => {
  if (socket) {
    socket.disconnect();
  }
}

const registerNewUser = (socketId: string) => {
  let userCredentials : ILoggedIn | null | undefined = store.getState().user.user;

  if (socketId && userCredentials?.displayName) {
    socket.emit('register-new-user', { 
      displayName: userCredentials?.displayName,
      fullName: userCredentials?.fullName,
      socketId: socketId,
    });
  }
}

const broadcastHandler = (data: IBroadcastData) => {
  switch (data.event) {
    case BROADCAST.ACTIVE_USERS:
      const activeUsers = data.payload;
      store.dispatch(setActiveUsers(activeUsers));
      break;
    default:
      break;
  }
} 