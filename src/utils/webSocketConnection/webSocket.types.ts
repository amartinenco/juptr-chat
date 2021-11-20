export enum BROADCAST {
  ACTIVE_USERS = 'ACTIVE_USERS'
};

export interface IBroadcastData {
  event: BROADCAST,
  payload: any
}

export interface ICallAttempt {
  name: string,
  target: string,
  type: string,
}

export interface ICallAttemptResponse {
  name: string,
  target: string,
  response: CallAttemptResponse
}

export enum CallAttemptResponse {
  CALL_ACCEPTED = 'CALL_ACCEPTED',
  CALL_REJECTED = 'CALL_REJECTED',
  CALL_UNAVAILABLE = 'CALL_UNAVAILABLE',
}

export enum CallConnectionStatus {
  CALL_CONNECTION_TERMINATED= 'CALL_CONNECTION_TERMINATED',
}

export interface ICallStatusChange {
  name: string,
  target: string,
  status: CallConnectionStatus
}