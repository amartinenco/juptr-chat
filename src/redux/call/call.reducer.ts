import { CallActionTypes, CallState } from "./call.types";

interface ICallAction {
  type: CallActionTypes;
	payload?: any;
}

export const callInitialState : CallState = {
  localStream: null,
	remoteStream: null
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
		default:
			return state;
	}
}

export default CallReducer;