import { List, ListItem, Grid, ListItemText, Divider, TextField, Fab } from '@material-ui/core';
import React from 'react';
import chatMessageStyles from './chat-message.styles';

const ChatMessage: React.FC = () => {
  const classes = chatMessageStyles();

  return (
    <ListItem>
      <Grid container>
          <Grid item xs={12}>
              {/* <div className={`${classes.message}`}> */}
              {/* <ListItemText> */}
               
              <div className={`${classes.messageArea} ${classes.right} `}>
                <div className={`${classes.message}`}>
                  <div className={classes.byWho}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque ipsum atque recusandae iste a dignissimos iure error eveniet sapiente possimus! Praesentium fugit incidunt nesciunt excepturi officia reiciendis sint mollitia consectetur! 
                  </div>
                  <div>
                    9:30
                  </div>

                  <ListItemText primary="                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque ipsum atque recusandae iste a dignissimos iure error eveniet sapiente possimus! Praesentium fugit incidunt nesciunt excepturi officia reiciendis sint mollitia consectetur! 
"> </ListItemText>
                </div>
              </div>
              {/* </ListItemText> */}
              {/* </div> */}
          {/* </Grid> */}
          {/* <Grid item xs={12}>
              <ListItemText secondary="09:30"></ListItemText>*/}
          </Grid> 
        
      </Grid>
    </ListItem>
  );
}

export default ChatMessage;