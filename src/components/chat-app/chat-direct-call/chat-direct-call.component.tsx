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
  const remoteStream = useSelector((state: RootState) => state.call.remoteStream);
  const callState = useSelector((state: RootState) => state.call.callState);
  const name = useSelector((state: RootState) => state.call.name);
  // const callDialog = useSelector((state: RootState) => state.call.showCallDialog);

  // const dispatch = useDispatch();

  // useEffect(() => {
  //   if (!remoteStream && callState === CallStates.CALL_IN_PROGRESS) {
  //     //RESET_CALL_STATE
  //     dispatch(resetCallState());
  //   }
  // }, [remoteStream, callState]); 

  return (
    <div className={classes.root}>
      <LocalVideoView />
      {callState === CallStates.CALL_REQUESTED ?
        <CallDialog name={name} />: null
      }

      {/* <CallDialog name={'asdasdasdasdaasdasdasdasdasdasdasdasdasd'} isCalling={true}/> */}
      <div className={remoteStream && callState === CallStates.CALL_IN_PROGRESS ? classes.talking : classes.pending} >
      {/* <RemoteVideoView /> */}
        {/* {remoteStream && callState === CallStates.CALL_IN_PROGRESS ? <RemoteVideoView /> : null } */}
        {remoteStream && callState === CallStates.CALL_IN_PROGRESS ? <ConversationButtons /> : null }
        {remoteStream && callState === CallStates.CALL_IN_PROGRESS ? <RemoteVideoView /> : null}
      </div>
    </div>
  );
}

export default ChatDirectCall;