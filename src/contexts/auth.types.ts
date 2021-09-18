import IResponseError from "../types/error.interface";
import ILoggedIn from "../types/logged-in.interface";

export type AuthState = {
  user?: ILoggedIn;
  errorMessage?: IResponseError;
  loading?: boolean;
}

export const authInitialState : AuthState = {
  user: {
    displayName: '',
    email: '',
    fullName: '',
    id: '' 
  },
  loading: false,
  errorMessage: {
    msg: '',
    param: ''
  }
}

export enum AuthActionTypes {
  REQUEST_LOGIN = 'REQUEST_LOGIN',
  LOGIN_SUCCESS = 'LOGIN_SUCCESS',
  LOGIN_ERROR = 'LOGIN_ERROR',
  LOGOUT = 'LOGOUT',
  CHECK_USER_SESSION = 'CHECK_USER_SESSION'
};

export type AuthAction = {
  type: AuthActionTypes;
  payload?: { user: ILoggedIn};
  error?: IResponseError;
}



