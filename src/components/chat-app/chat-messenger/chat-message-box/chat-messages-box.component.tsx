
import React from 'react';
import { sendTextMessage } from '../../../../utils/webRTC/webRTC.service';
import { Grid, TextField, Fab} from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
interface Props {
}

const ChatMessagesBox: React.FC<Props> = (props) => {
  const [userTextMessage, setTextMessage] = React.useState<{ message: string }>({ message: ''});
  const { message } = userTextMessage;
  
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (message) {
      sendTextMessage(message);
    }
    setTextMessage(message => ({ message: '' }));
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setTextMessage(message => ({ message: value }));
  };

  const onEnterPressed = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      if (message) {
        console.log('message', message);
        sendTextMessage(message);
      }
      setTextMessage((message) => ({ message: '' }));
    }
  }

  return (
    <Grid container style={{padding: '20px'}}>
        <form style={{
          display: 'flex',
          flexFlow: 'row wrap',
          alignItems: 'center',
          width: '95%'
        }} onSubmit={handleSubmit} noValidate>
          <Grid item xs={11}>
              <TextField id="outlined-basic-email" label="Type your message" fullWidth 
                onChange={handleChange}
                onKeyDown={onEnterPressed}
                value={message}
              />
          </Grid>
          <Grid xs={1}>
            <Fab color="primary" aria-label="send" type="submit">
              <SendIcon />
            </Fab>
          </Grid>
        </form>
      </Grid>
  );
}

export default ChatMessagesBox;