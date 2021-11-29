
import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store';
import ChatMessage from '../chat-message/chat-message.component';
import chatMessagesFeedStyles from './chat-messages-feed.styles';

interface Props {

}

const ChatMessagesFeed: React.FC<Props> = (props) => {
  const classes = chatMessagesFeedStyles();
  const textMessagesRef = useRef<HTMLDivElement>(null);
  const textMessages = useSelector((state: RootState) => state.call.textMessages); 
  const name = useSelector((state: RootState) => state.call.name);
  const user = useSelector((state: RootState) => state.user.user);

  useEffect(() => {
    // console.log('added');
    textMessagesRef.current?.scrollIntoView({ behavior: 'smooth'});
  }, [textMessages]);

  return (
    <div className={classes.messageArea}>
      {textMessages.map((message, i) => (
        <div key={i} ref={textMessagesRef}>
          <ChatMessage message={message} name={ message.from === 'other'? name :  user?.displayName} key={i} />
        </div>
      ))}
    </div>
  );
}

export default ChatMessagesFeed;