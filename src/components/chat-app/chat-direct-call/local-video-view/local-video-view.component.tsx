import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store';
import localVideoViewStyles from './local-video-view.styles';

const LocalVideoView: React.FC = () => {
  const classes = localVideoViewStyles();
  const localStream = useSelector((state: RootState) => state.call.localStream);
  const localVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (localStream) {
      const localVideo = localVideoRef.current;
      if (localVideo) {
        localVideo.srcObject = localStream;
        localVideo.onloadedmetadata = () => {
          localVideo.play();
        };
      }
    }
  }, [localStream]);

  return (
    <div className={classes.localVideoContainer}>
      <video className={classes.videoElement} ref={localVideoRef} autoPlay muted />
    </div>
  );
}

export default LocalVideoView;