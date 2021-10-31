import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import React, { useEffect } from 'react';
import ChatAppBar from '../../components/chat-app/chat-app-bar/chat-app-bar.component';
import ChatDirectCall from '../../components/chat-app/chat-direct-call/chat-direct-call.component';
import ChatUsers from '../../components/chat-app/chat-users/chat-users.component';
import { connectWithWebSocket } from '../../utils/webSocketConnection/webSocketConnection.service';
import chatStyles from './chat.styles';

const Chat: React.FC = () => {

  const classes = chatStyles();

  useEffect(()=>{
    connectWithWebSocket();
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
      </Grid>
    </div>
  );
}

export default Chat;