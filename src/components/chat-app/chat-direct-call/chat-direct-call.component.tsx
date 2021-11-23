import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetCallState } from '../../../redux/call/call.actions';
import { CallStates } from '../../../redux/call/call.types';
import { RootState } from '../../../redux/store';
import CallDialog from './call-dialog/call-dialog.component';
import chatDirectCallStyles from './chat-direct-call.styles';
import ConversationButtons from './conversation-buttons/conversation-buttons.component';
import LocalVideoView from './local-video-view/local-video-view.component';
import RemoteVideoView from './remote-video-view/remote-video-view.component';

const ChatDirectCall: React.FC = () => {
  const classes = chatDirectCallStyles();
  const user = useSelector((state: RootState) => state.user.user);
  const localStream = useSelector((state: RootState) => state.call.localStream);
  const remoteStream = useSelector((state: RootState) => state.call.remoteStream);
  const callState = useSelector((state: RootState) => state.call.callState);
  const name = useSelector((state: RootState) => state.call.name);
  const isScreenSharing = useSelector((state: RootState) => state.call.isScreenSharing);
  const isCameraEnabled = useSelector((state: RootState) => state.call.isCameraEnabled);
  const isMicrophoneEnabled = useSelector((state: RootState) => state.call.isMicrophoneEnabled);

  return (
    <div className={classes.root}>
      <LocalVideoView />
      {callState === CallStates.CALL_REQUESTED ?
        <CallDialog name={name} />: null
      }
      <div className={remoteStream && callState === CallStates.CALL_IN_PROGRESS ? classes.talking : classes.pending} >
        {user && callState === CallStates.CALL_IN_PROGRESS ? 
          <ConversationButtons 
            currentUser={user}
            targetUserId={name}
            localStream={localStream}
            // remoteStream={remoteStream}
            isScreenSharing={isScreenSharing}
            isCameraEnabled={isCameraEnabled}
            isMicrophoneEnabled={isMicrophoneEnabled}
          /> 
          : null 
        }
        {remoteStream && callState === CallStates.CALL_IN_PROGRESS ? <RemoteVideoView /> : 
        
        null
        }
      </div>
    </div>
  );
}

export default ChatDirectCall;