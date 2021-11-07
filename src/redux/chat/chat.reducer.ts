import { ChatActionTypes, ChatState } from "./chat.types";

interface IChatAction {
  type: ChatActionTypes;
	payload?: any;
}

export const chatInitialState : ChatState = {
  activeUsers: []
}

const ChatReducer = (state: ChatState = chatInitialState, action: IChatAction) : ChatState => {
	switch (action.type) {
		case ChatActionTypes.SET_ACTIVE_USERS:
			return {
				...state,
        activeUsers: action.payload
			};
		default:
			return state;
	}
}

export default ChatReducer;