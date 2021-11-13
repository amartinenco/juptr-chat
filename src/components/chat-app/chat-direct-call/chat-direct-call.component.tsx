import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import chatDirectCallStyles from './chat-direct-call.styles';
import LocalVideoView from './local-video-view/local-video-view.component';
import RemoteVideoView from './remote-video-view/remote-video-view.component';

const ChatDirectCall: React.FC = () => {
  const classes = chatDirectCallStyles();
  const remoteStream = useSelector((state: RootState) => state.call.remoteStream);
  
  return (
    <div className={classes.root}>
      <LocalVideoView />
      <div className={remoteStream ? classes.talking : classes.pending} >
        <RemoteVideoView />
      </div>
    </div>
  );
}

export default ChatDirectCall;