import { Divider} from '@material-ui/core';
import React from 'react';
import chatMessengerStyles from './chat-messenger.styles';
import ChatMessagesFeed from './chat-message-feed/chat-messages-feed.component';
import ChatMessagesBox from './chat-message-box/chat-messages-box.component';

const ChatMessenger: React.FC = () => {
  const classes = chatMessengerStyles();

  return (
    <div className={classes.root}>
      <ChatMessagesFeed />
      <Divider />
      <ChatMessagesBox />
    </div>
  );
}

export default ChatMessenger;