import { ChatActionTypes } from "./chat.types";

export const setActiveUsers = (activeUsers : string[]) => ({
  type: ChatActionTypes.SET_ACTIVE_USERS,
  payload: activeUsers
});
