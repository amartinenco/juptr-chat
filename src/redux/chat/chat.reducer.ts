import { ChatActionTypes, ChatState } from "./chat.types";

interface IChatAction {
  type: ChatActionTypes;
	payload?: any;
}

export const chatInitialState : ChatState = {
  activeUsers: [],
	availableUsers: [],
	busyUsers: []
}

const ChatReducer = (state: ChatState = chatInitialState, action: IChatAction) : ChatState => {
	switch (action.type) {
		case ChatActionTypes.SET_ACTIVE_USERS:
			return {
				...state,
				activeUsers: action.payload
			};
		case ChatActionTypes.SET_AVAILABLE_USERS:
			return {
				...state,
				availableUsers: action.payload
				// busyUsers: state.busyUsers.filter((currentUser) => {
				// 	return !action.payload.includes(currentUser);
				// })
			};
		case ChatActionTypes.SET_BUSY_USERS:
			return {
				...state,
				busyUsers: action.payload
				// busyUsers: action.payload
			};
		default:
			return state;
	}
}

export default ChatReducer;