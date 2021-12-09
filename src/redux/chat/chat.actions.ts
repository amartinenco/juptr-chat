import { ChatActionTypes } from "./chat.types";

export const setActiveUsers = (activeUsers : string[]) => ({
  type: ChatActionTypes.SET_ACTIVE_USERS,
  payload: activeUsers
});

export const setBusyUsers = (busyUsers : string[]) => ({
  type: ChatActionTypes.SET_BUSY_USERS,
  payload: busyUsers
});

export const setAvailableUsers = (availableUsers : string[]) => ({
  type: ChatActionTypes.SET_AVAILABLE_USERS,
  payload: availableUsers
});
