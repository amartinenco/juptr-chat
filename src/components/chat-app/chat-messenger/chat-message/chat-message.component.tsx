import { ListItem, Grid, ListItemText } from '@material-ui/core';
import React from 'react';
import { ITextMessage } from '../../../../redux/call/call.types';
import chatMessageStyles from './chat-message.styles';

interface Props {
  message: ITextMessage,
  name: string | undefined, 
}

const ChatMessage: React.FC<Props> = React.memo((props) => {
  const classes = chatMessageStyles();
  const messagePayload = props.message;
  const otherUserName = props.name;

  return (
    <ListItem>
      <Grid container>
        <Grid item xs={12}>
          <div className={`${classes.messageArea} ${ (messagePayload.from === 'me')? classes.left : classes.right } `}>
            <div className={`${classes.message}`} style={ 
              (messagePayload.from === 'me')?
              { background: '#3f51b5'}:
              { background: '#c77708'}
            }
            >
              <div className={classes.byWho}>
                <strong>{otherUserName}</strong>
              </div>
              <div>
                { String(messagePayload.date?.toLocaleString()) }
              </div>
              <ListItemText primary={ messagePayload.message }> </ListItemText>
            </div>
          </div>
        </Grid> 
      </Grid>
    </ListItem>
  );
}
);

export default ChatMessage;