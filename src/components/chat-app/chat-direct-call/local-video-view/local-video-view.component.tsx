import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store';
import localVideoViewStyles from './local-video-view.styles';

const LocalVideoView: React.FC = () => {
  const classes = localVideoViewStyles();
  const localStream = useSelector((state: RootState) => state.call.localStream);
  const screenSharingStream = useSelector((state: RootState) => state.call.screenSharingStream);
  const isScreenSharing = useSelector((state: RootState) => state.call.isScreenSharing);

  const localVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (localStream && !isScreenSharing) {
      const localVideo = localVideoRef.current;
      if (localVideo) {
        localVideo.srcObject = localStream;
        localVideo.onloadedmetadata = () => {
          localVideo.play();
        };
      }
    } else {
      const localVideo = localVideoRef.current;
      if (localVideo) {
        localVideo.srcObject = screenSharingStream;
        localVideo.onloadedmetadata = () => {
          localVideo.play();
        };
      }
    }
  }, [localStream, isScreenSharing, screenSharingStream]);

  return (
    
    <div className={classes.localVideoContainer}>
      <video className={classes.videoElement} ref={localVideoRef} autoPlay muted />
    </div>
  );
}

export default LocalVideoView;