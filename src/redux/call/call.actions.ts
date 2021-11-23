import { CallActionTypes, CallStates, IDialogType } from './call.types';

export const setLocalStream = (localStream: MediaStream) => ({
  type: CallActionTypes.SET_LOCAL_STREAM,
  payload: localStream
});

export const setRemoteStream = (remoteStream: MediaStream) => ({
  type: CallActionTypes.SET_REMOTE_STREAM,
  payload: remoteStream
});

export const setScreenSharingStream = (screenSharingStream: MediaStream) => ({
  type: CallActionTypes.SET_SCREENSHARING_STREAM,
  payload: screenSharingStream
});

export const setCallState = (callState: CallStates) => ({
  type: CallActionTypes.SET_CALL_STATE,
  payload: callState
});

export const setCameraEnabled = (isCameraEnabled: boolean) => ({
  type: CallActionTypes.SET_CAMERA_ENABLED,
  payload: isCameraEnabled
});

export const setMicrophoneEnabled = (isMicrophoneEnabled: boolean) => ({
  type: CallActionTypes.SET_MICROPHONE_ENABLED,
  payload: isMicrophoneEnabled
});

export const setScreenSharingEnabled = (isScreenSharing: boolean) => ({
  type: CallActionTypes.SET_SCREENSHARING_ENABLED,
  payload: isScreenSharing
});

export const resetCallState = () => ({
  type: CallActionTypes.RESET_CALL_STATE
});

export const showCallDialog = (showCallDialog: IDialogType) => ({
  type: CallActionTypes.SHOW_CALL_DIALOG,
  payload: showCallDialog
});

export const setCallerName = (name: string) => ({
  type: CallActionTypes.SET_NAME_OF_CALLER,
  payload: name
});