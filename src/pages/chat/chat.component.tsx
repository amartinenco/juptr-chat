import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import React, { useEffect } from 'react';
import ChatAppBar from '../../components/chat-app/chat-app-bar/chat-app-bar.component';
import ChatDirectCall from '../../components/chat-app/chat-direct-call/chat-direct-call.component';
import ChatMessenger from '../../components/chat-app/chat-messenger/chat-messenger.component';
import ChatUsers from '../../components/chat-app/chat-users/chat-users.component';
import { setUpLocalStream } from '../../utils/webRTC/webRTC.service';
import { connectWithWebSocket, disconnectWebSocket } from '../../utils/webSocketConnection/webSocketConnection.service';
import chatStyles from './chat.styles';

const Chat: React.FC = React.memo(() => {

  const classes = chatStyles();

  useEffect(()=>{
    connectWithWebSocket();
    return function cleanup() {
      disconnectWebSocket();
    }
  },[]);

  useEffect(() => {
    setUpLocalStream();
  },[]);

  return (
    <div>
      <ChatAppBar />
      <Grid container component={Paper} className={classes.chatSection}>
        <Grid item xs={2} className={classes.borderRight}>
          <ChatUsers />
        </Grid>
        <Grid item xs={6} className={classes.borderRight}>
          <ChatDirectCall />
        </Grid>
        <Grid item xs={4} className={classes.borderRight}>
          <ChatMessenger />
        </Grid>
      </Grid>
    </div>
  );
}
);

export default Chat;