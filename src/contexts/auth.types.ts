import IResponseError from "../types/error.interface";
import ILoggedIn from "../types/logged-in.interface";

export type AuthState = {
  user?: ILoggedIn;
  errorMessage: IResponseError[];
  loading: boolean;
}

export const authInitialState : AuthState = {
  user: {
    displayName: '',
    email: '',
    fullName: '',
    id: '' 
  },
  loading: true,
  errorMessage: []
}

export enum AuthActionTypes {
  REQUEST_LOGIN = 'REQUEST_LOGIN',
  LOGIN_SUCCESS = 'LOGIN_SUCCESS',
  LOGIN_ERROR = 'LOGIN_ERROR',
  LOGOUT = 'LOGOUT',
  CHECK_USER_SESSION = 'CHECK_USER_SESSION',
  CURRENT_USER_SESSION = 'CURRENT_USER_SESSION',
  REQUEST_REGISTRATION = 'REQUEST_REGISTRATION',
  REGISTRATION_SUCCESS = 'REGISTRATION_SUCCESS',
  REGISTRATION_ERROR = 'REGISTRATION_ERROR',
  RESET_ERRORS = 'RESET_ERRORS'
};

export type AuthAction = {
  type: AuthActionTypes;
  payload?: { user: ILoggedIn};
  error?: IResponseError[];
}



