export type ChatState = {
  activeUsers: string[],
  availableUsers: string[],
	busyUsers: string[]
}

export enum ChatActionTypes {
  SET_ACTIVE_USERS = 'SET_ACTIVE_USERS',
  SET_AVAILABLE_USERS = 'SET_AVAILABLE_USERS',
  SET_BUSY_USERS = 'SET_BUSY_USERS'
}