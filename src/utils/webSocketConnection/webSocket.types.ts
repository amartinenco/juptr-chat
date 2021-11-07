export enum BROADCAST {
  ACTIVE_USERS = 'ACTIVE_USERS'
};

export interface IBroadcastData {
  event: BROADCAST,
  payload: any
}