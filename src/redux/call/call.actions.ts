import { CallActionTypes } from './call.types';

export const setLocalStream = (localStream: MediaStream) => ({
  type: CallActionTypes.SET_LOCAL_STREAM,
  payload: localStream
});

export const setRemoteStream = (remoteStream: MediaStream) => ({
  type: CallActionTypes.SET_REMOTE_STREAM,
  payload: remoteStream
});
