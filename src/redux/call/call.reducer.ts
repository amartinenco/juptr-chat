import { CallActionTypes, CallState, CallStates } from "./call.types";

interface ICallAction {
  type: CallActionTypes;
	payload?: any;
}

export const callInitialState : CallState = {
	callState: CallStates.CALL_AVAILABLE,
  localStream: null,
  remoteStream: null,
	screenSharingStream: null,
  isScreenSharing: false,
  isCameraEnabled: true,
  isMicrophoneEnabled: true,
  name: '',
	showCallDialog: { show: false }
}

const CallReducer = (state: CallState = callInitialState, action: ICallAction) : CallState => {
	switch (action.type) {
		case CallActionTypes.SET_LOCAL_STREAM:
			return {
				...state,
        localStream: action.payload
			};
		case CallActionTypes.SET_REMOTE_STREAM:
			return {
				...state,
				remoteStream: action.payload
			};
		case CallActionTypes.SET_SCREENSHARING_STREAM:
			return {
				...state,
				screenSharingStream: action.payload
			};
		case CallActionTypes.SET_CALL_STATE:
			return {
				...state,
				callState: action.payload
			};
		case CallActionTypes.SET_CAMERA_ENABLED:
			return {
				...state,
				isCameraEnabled: action.payload
			};
		case CallActionTypes.SET_MICROPHONE_ENABLED:
			return {
				...state,
				isMicrophoneEnabled: action.payload
			};
		case CallActionTypes.SET_SCREENSHARING_ENABLED:
			return {
				...state,
				isScreenSharing: action.payload
			};
		case CallActionTypes.SET_NAME_OF_CALLER:
			return {
				...state,
				name: action.payload
			};
		case CallActionTypes.SHOW_CALL_DIALOG:
			return {
				...state,
				showCallDialog: action.payload
			};
		case CallActionTypes.RESET_CALL_STATE:
			return {
				...state,
				callState: CallStates.CALL_AVAILABLE,
				// localStream: null,
				remoteStream: null,
				screenSharingStream: null,
				isScreenSharing: false,
				isCameraEnabled: true,
				isMicrophoneEnabled: true,
				name: '',
				showCallDialog: { show: false },
			}
		default:
			return state;
	}
}

export default CallReducer;