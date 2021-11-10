export type CallState = {
  localStream: MediaStream | null
}

export enum CallActionTypes {
  SET_LOCAL_STREAM = 'SET_LOCAL_STREAM'
}