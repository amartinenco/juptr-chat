import React from 'react';
import ConversationButton from './conversation-button/conversation-button.component';
import conversationButtonsStyles from './conversation-buttons.styles';

import CallEndIcon from '@material-ui/icons/CallEnd';
import CallIcon from '@material-ui/icons/Call';
import { green } from '@material-ui/core/colors';
import Button from "@material-ui/core/Button";

import ScreenShareIcon from '@material-ui/icons/ScreenShare';
import StopScreenShareIcon from '@material-ui/icons/StopScreenShare';
import VideocamIcon from '@material-ui/icons/Videocam';
import VideocamOffIcon from '@material-ui/icons/VideocamOff';
import MicOffIcon from '@material-ui/icons/MicOff';
import MicIcon from '@material-ui/icons/Mic';
import { terminateConversation } from '../../../../utils/webSocketConnection/webSocketConnection.service';
import { RootState } from '../../../../redux/store';
import { useSelector } from 'react-redux';

const ConversationButtons = () => {
  const classes = conversationButtonsStyles();
  const user = useSelector((state: RootState) => state.user.user);
  const target = useSelector((state: RootState) => state.call.name);

  const hangUpHandler = () => {
    if (user && target) {
      terminateConversation(user, target);
    }
  };

  return (
    <div className={classes.buttonContainer}> 
      <ConversationButton onClickHandler={hangUpHandler}>
        <CallEndIcon color="secondary" style={{ fontSize: 35 }} />
      </ConversationButton>
      <ConversationButton onClickHandler={hangUpHandler}>
        <ScreenShareIcon color="primary" style={{ fontSize: 35 }} />
      </ConversationButton>
      <ConversationButton onClickHandler={hangUpHandler}>
        <MicOffIcon color="secondary" style={{ fontSize: 35 }} />
      </ConversationButton>
      <ConversationButton onClickHandler={hangUpHandler}>
        <VideocamOffIcon color="secondary" style={{ fontSize: 35 }} />
      </ConversationButton>
    {/* <button type="button" onClick={() => {
      console.log('hi')
    }}> Test </button> */}
      {/* <ConversationButton > */}
        {/* <CallEndIcon color="secondary" style={{  }} /> */}
      {/* </ConversationButton> */}
      {/* <ConversationButton onClickHandler={hangUpHandler}>
        <CallEndIcon color="secondary" style={{  }} />
      </ConversationButton>
      <ConversationButton onClickHandler={hangUpHandler}>
        <CallEndIcon color="secondary" style={{  }} />
      </ConversationButton> */}
      {/* <ConversationButton onClickHandler={hangUpHandler}> */}
        {/* <Button 
          variant="contained" 
          startIcon={<CallEndIcon color="secondary" style={{ fontSize: 50 }} />}
          onClick={hangUpHandler}
        >
        </Button> */}
      {/* </ConversationButton> */}
      
      {/* <ConversationButton onClickHandler={handleHangUpButtonPressed}>
        <MdCallEnd style={styles.icon} />
      </ConversationButton> */}

    {/* <Button 
      variant="contained" 
      startIcon={<CallEndIcon color="secondary" 
      style={{ fontSize: 50 }}/>}
      onClick={handleHangup}
      >
      Hang Up
    </Button> */}
    </div>
  )
}

export default ConversationButtons;