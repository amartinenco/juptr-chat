import socketClient, { Socket } from 'socket.io-client';
import { signOutStart } from '../../redux/auth/auth.actions';
import store from '../../redux/store';
import ILoggedIn from '../../types/logged-in.interface';

const SERVER = 'http://localhost:5000';

let socket : Socket;

export const connectWithWebSocket = () => {
  socket = socketClient(SERVER, {
    withCredentials: true
  });
  
  socket.on('connect', () => {
    registerNewUser(socket.id)
  });

  socket.on('connect_error', err => {
    socket.disconnect();
    store.dispatch(signOutStart());
  });
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