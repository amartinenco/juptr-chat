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
import { useDispatch, useSelector } from 'react-redux';
import ILoggedIn from '../../../../types/logged-in.interface';
import { CallActionTypes } from '../../../../redux/call/call.types';
import { setCameraEnabled, setMicrophoneEnabled } from '../../../../redux/call/call.actions';
import { switchToScreenSharing } from '../../../../utils/webRTC/webRTC.service';

interface Props {
  currentUser: ILoggedIn
  targetUserId: string
  localStream : MediaStream | null
  // remoteStream : MediaStream
  isScreenSharing : boolean
  isCameraEnabled : boolean
  isMicrophoneEnabled : boolean
  // cameraAction : {
  //   type: CallActionTypes.SET_CAMERA_ENABLED
  //   payload: MediaStream
  // }
  // microphoneAction: {
  //   type: CallActionTypes.SET_MICROPHONE_ENABLED
  //   payload: MediaStream
  // }
  // screenSharingAction: {
  //   type: CallActionTypes.SET_SCREENSHARING_ENABLED
  //   payload: MediaStream
  // }
}

const ConversationButtons: React.FC<Props> = (props) => {
  const dispatch = useDispatch();
  const classes = conversationButtonsStyles();
  const currentUser = props.currentUser;
  const targetUserId = props.targetUserId;
  const localStream = props.localStream;
  // const remoteStream = props.remoteStream;
  const isScreenSharing = props.isScreenSharing;
  const isCameraEnabled = props.isCameraEnabled;
  const isMicrophoneEnabled = props.isMicrophoneEnabled;
  // const setCameraEnabled = props.cameraAction;
  // const setMicrophoneEnabled = props.microphoneAction;
  // const setScreenSharingEnabled = props.screenSharingAction;
  // const user = useSelector((state: RootState) => state.user.user);
  // const target = useSelector((state: RootState) => state.call.name);
  // const localStream = useSelector((state: RootState) => state.call.localStream);

  const hangUpHandler = () => {
    if (currentUser && targetUserId) {
      terminateConversation(currentUser, targetUserId);
    }
  };

  const cameraToggleHandler = () => {
    const cameraEnabled = isCameraEnabled;
    if (localStream && localStream.getVideoTracks().length > 0) {
      localStream.getVideoTracks()[0].enabled = !cameraEnabled;
      dispatch(setCameraEnabled(!cameraEnabled));
    }
  }

  const microphoneToggleHandler = () => {
    const microphoneEnabled = isMicrophoneEnabled;
    if (localStream) {
      localStream.getAudioTracks()[0].enabled = !microphoneEnabled;
      dispatch(setMicrophoneEnabled(!microphoneEnabled));
    }
  }

  const screenSharingToggleHandler = () => {
    const screenSharingEnabled = isScreenSharing;
    switchToScreenSharing(!screenSharingEnabled);
  }

  return (
    <div className={classes.buttonContainer}> 
      <ConversationButton onClickHandler={hangUpHandler}>
        <CallEndIcon color="secondary" style={{ fontSize: 35 }} />
      </ConversationButton>
      <ConversationButton onClickHandler={screenSharingToggleHandler}>
        { isScreenSharing ? 
          <StopScreenShareIcon color="secondary" style={{ fontSize: 35 }} /> :
          <ScreenShareIcon color="primary" style={{ fontSize: 35 }} />
        }
      </ConversationButton>
      <ConversationButton onClickHandler={microphoneToggleHandler}>
        { isMicrophoneEnabled ? 
          <MicOffIcon color="secondary" style={{ fontSize: 35 }} /> :
          <MicIcon color="primary" style={{ fontSize: 35 }} />
        }
      </ConversationButton>
      <ConversationButton onClickHandler={cameraToggleHandler}>
        { isCameraEnabled ?
        <VideocamOffIcon color="secondary" style={{ fontSize: 35 }} /> :
        <VideocamIcon color="primary" style={{ fontSize: 35 }} />
        }
      </ConversationButton>
    </div>
  )
}

export default ConversationButtons;