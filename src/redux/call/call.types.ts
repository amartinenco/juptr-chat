export type CallState = {
  callState: CallStates
  localStream: MediaStream | null,
  remoteStream: MediaStream | null,
  isScreenSharing: boolean,
  isCameraEnabled: boolean,
  isMicrophoneEnabled: boolean,
  name: string,
  showCallDialog: IDialogType
}

export interface IDialogType {
  type?: string,
  show: boolean
}

export enum CallStates {
  CALL_UNAVAILABLE = 'CALL_UNAVAILABLE',
  CALL_AVAILABLE = 'CALL_AVAILABLE',
  CALL_REQUESTED = 'CALL_REQUESTED',
  CALL_IN_PROGRESS = 'CALL_IN_PROGRESS'
}

export enum CallActionTypes {
  SET_LOCAL_STREAM = 'SET_LOCAL_STREAM',
  SET_REMOTE_STREAM = 'SET_REMOTE_STREAM',
  SET_CALL_STATE = 'SET_CALL_STATE',
  SET_CAMERA_ENABLED = 'SET_CAMERA_ENABLED',
  SET_MICROPHONE_ENABLED = 'SET_MICROPHONE_ENABLED',
  SET_SCREENSHARING_ENABLED = 'SET_SCREENSHARING_ENABLED',
  SET_NAME_OF_CALLER = 'SET_NAME_OF_CALLER',
  RESET_CALL_STATE = 'RESET_CALL_STATE',
  SHOW_CALL_DIALOG = 'SHOW_CALL_DIALOG'
}