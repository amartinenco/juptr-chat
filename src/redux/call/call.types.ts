export type CallState = {
  localStream: MediaStream | null,
  remoteStream: MediaStream | null
}

export enum CallActionTypes {
  SET_LOCAL_STREAM = 'SET_LOCAL_STREAM',
  SET_REMOTE_STREAM = 'SET_REMOTE_STREAM',
}