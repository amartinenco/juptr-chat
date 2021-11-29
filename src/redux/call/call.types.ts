export type CallState = {
  callState: CallStates
  localStream: MediaStream | null,
  remoteStream: MediaStream | null,
  screenSharingStream: MediaStream | null,
  isScreenSharing: boolean,
  isCameraEnabled: boolean,
  isMicrophoneEnabled: boolean,
  name: string,
  showCallDialog: IDialogType,
  lastTextMessage: ITextMessage | undefined,
  textMessages: ITextMessage[],
}

export interface ITextMessage {
  message: string,
  from: string,
  date: Date | undefined;
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
  SET_SCREENSHARING_STREAM = 'SET_SCREENSHARING_STREAM',
  SET_CALL_STATE = 'SET_CALL_STATE',
  SET_CAMERA_ENABLED = 'SET_CAMERA_ENABLED',
  SET_MICROPHONE_ENABLED = 'SET_MICROPHONE_ENABLED',
  SET_SCREENSHARING_ENABLED = 'SET_SCREENSHARING_ENABLED',
  SET_NAME_OF_CALLER = 'SET_NAME_OF_CALLER',
  RESET_CALL_STATE = 'RESET_CALL_STATE',
  SHOW_CALL_DIALOG = 'SHOW_CALL_DIALOG',
  SET_LAST_TEXT_MESSAGE = 'SET_LAST_TEXT_MESSAGE',
  NEW_TEXT_MESSAGE = 'NEW_TEXT_MESSAGE'
}
