import socketClient, { Socket } from 'socket.io-client';
import { signOutStart } from '../../redux/auth/auth.actions';
import store from '../../redux/store';

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

  socket.on('connect_error', err => {
    
    // useDispatch(signOutStart());
    console.log(err)
    store.dispatch(signOutStart());
  });

  socket.io.on('error', () => {
    console.log('error');
    console.log("Sorry, there seems to be an issue with the connection!");
  });

  socket.io.on("reconnect_error", (error) => { 
    console.log('reconnect_error');
    console.log("Sorry, there seems to be an issue with the connection!");
  });

  socket.io.on("reconnect_failed", () => {
    console.log('reconnect_failed');  
    console.log("Sorry, there seems to be an issue with the connection!");
  });

  socket.io.on("reconnect_attempt", (attempt) => {
    console.log('reconnect_attempt');
    console.log("Sorry, there seems to be an issue with the connection!");
  });
}