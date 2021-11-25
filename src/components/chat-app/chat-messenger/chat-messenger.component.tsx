import { List, ListItem, Grid, ListItemText, Divider, TextField, Fab, Box } from '@material-ui/core';
import React from 'react';
import chatMessengerStyles from './chat-messenger.styles';
import SendIcon from '@material-ui/icons/Send';
import ChatMessage from './chat-message/chat-message.component';

const ChatMessenger: React.FC = () => {
  const classes = chatMessengerStyles();

  return (
    <div className={classes.root}>
      <ChatMessage />
      {/* <div className={`${classes.messageArea} ${classes.right}`}>
        <div className={classes.message}>
          lorem
        </div>
      </div>
      <div className={`${classes.messageArea} ${classes.left}`}>
        <div className={classes.message}>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Natus incidunt aliquam fuga quidem perferendis reiciendis tenetur! Debitis ut, inventore expedita pariatur blanditiis, fugiat omnis magnam, tempore sed accusamus libero vel.
        </div>
      </div> */}

      {/* <div
          style={{
            border: "0.5px solid black",
            borderRadius: "10px",
            margin: "5px",
            padding: "10px",
            display: "inline-block",
          }} 
          >Hello world1
        </div>
        <div
          style={{
            border: "0.5px solid black",
            borderRadius: "10px",
            margin: "5px",
            padding: "10px",
            display: "inline-block",
          }} 
          >Hello world2
        </div>
        <div
          style={{
            border: "0.5px solid black",
            borderRadius: "10px",
            margin: "5px",
            padding: "10px",
            display: "inline-block",
            width: "230px",
            justifyContent: "flex-end !important",
            alignContent: 'flex-end'
          }} 
          >Hello world3
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sunt modi facilis delectus voluptatibus neque quo sequi, laborum ipsam odit aut saepe ipsa quia temporibus, sed dolorem ducimus et tempore cumque!
        </div> */}
        {/* <div
          style={{
            display: "inline-block",
            justifyContent: 'flex-start !important',
          }} 
          >Hello world2
        </div> */}
        {/* <div
          style={{
            display: "inline-block",
            justifyContent: 'flex-end !important'
          }}
        >Hello world2</div> */}
      {/* </div> */}

      <Divider />
      <Grid container style={{padding: '20px'}}>
          <Grid item xs={11}>
              <TextField id="outlined-basic-email" label="Type Something" fullWidth />
          </Grid>
          <Grid xs={1}>
              <Fab color="primary" aria-label="add">
                <SendIcon />
              </Fab>
          </Grid>
      </Grid>
    </div>
  );
}

export default ChatMessenger;