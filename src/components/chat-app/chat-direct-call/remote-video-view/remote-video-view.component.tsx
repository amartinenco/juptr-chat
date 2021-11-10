import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store';
import remoteVideoViewStyles from './remote-video-view.styles';

const RemoteVideoView: React.FC = () => {
  const classes = remoteVideoViewStyles();
  // const remoteStream = useSelector((state: RootState) => state.call.localStream);
  const remoteStream = null;
  const remoteVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (remoteStream) {
      const remoteVideo = remoteVideoRef.current;
      if (remoteVideo) {
        remoteVideo.srcObject = remoteStream;
        remoteVideo.onloadedmetadata = () => {
          remoteVideo.play();
        };
      }
    }
  }, [remoteStream]);

  return (
    <div className={classes.remoteVideoContainer}>
      <video className={classes.videoElement} ref={remoteVideoRef} autoPlay muted />
    </div>
  );
}

export default RemoteVideoView;